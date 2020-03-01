import {Component, ElementRef, Inject, OnInit, Renderer2, ViewChild} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {environment} from '../../environments/environment';
import {CallbackID, Network, Plugins} from '@capacitor/core';
import {} from 'googlemaps';
import {PokemonService} from '../services/pokemon.service';
import {Pokemon} from '../models/pokemon';
import {Router} from '@angular/router';

const {Geolocation} = Plugins;

@Component({
  selector: 'app-pokemon-map',
  templateUrl: './pokemon-map.page.html',
  styleUrls: ['./pokemon-map.page.scss'],
})
export class PokemonMapPage implements OnInit {

  @ViewChild('googleMap', {static: false}) googleMapsEl: ElementRef;

  private initialPosition = {lat: 51.688640, lng: 5.287090};
  private map: google.maps.Map;
  private userMarker: google.maps.Marker;
  private mapsLoaded = false;
  private networkHandler = null;
  private apiKey = environment.google_maps_key;
  private callbackId: CallbackID;
  private pokemonMarkers: google.maps.Marker[] = [];

  constructor(
      private renderer: Renderer2,
      @Inject(DOCUMENT) private document,
      private pokemonService: PokemonService,
      private router: Router
  ) { }

  ngOnInit() {
    this.init().then(res => {
      console.log('Google Maps ready');
    }, err => {
      console.log(err);
    });
  }

  ionViewWillEnter() {
    this.followUser();
  }

  ionViewDidLeave() {
    this.stopFollowingUser();
  }

  private init(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.loadSDK().then((res) => {
        this.initMap().then((res) => {
          resolve(true);
        }, (err) => {
          reject(err);
        });
      }, (err) => {
        reject(err);
      });
    });
  }

  private loadSDK(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (!this.mapsLoaded) {
        Network.getStatus().then(status => {
          if (status.connected) {
            this.injectSDK().then(res => {
              resolve(true);
            }, err => {
              reject(err);
            });
          } else {
            if (this.networkHandler == null) {
              this.networkHandler = Network.addListener('networkStatusChange', status => {
                if (status.connected) {
                  this.networkHandler.remove();

                  this.init().then(res => {
                    console.log("Google Maps ready");
                  }, err => {
                    console.log(err);
                  })
                }
              })
            }

            reject('Not online');
          }
        }, err => {
          if(navigator.onLine){
            this.injectSDK().then((res) => {
              resolve(true);
            }, (err) => {
              reject(err);
            });

          } else {
            reject('Not online');
          }
        });
      } else {
        reject('SDK not injected');
      }
    });
  }

  private injectSDK(): Promise<any> {
    return new Promise((resolve, reject) => {
      window['mapInit'] = () => {
        this.mapsLoaded = true;
        resolve(true);
      };

      let script = this.renderer.createElement('script');
      script.id = 'googleMaps';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&callback=mapInit&libraries=geometry`;

      this.renderer.appendChild(this.document.body, script);
    });
  }

  private initMap(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.map = new google.maps.Map(this.googleMapsEl.nativeElement, {
        zoom: 15,
        center: this.initialPosition,
        disableDefaultUI: true,
        clickableIcons: false,
        gestureHandling: 'none',
        styles: [
          {
            "featureType": "poi",
            "elementType": "labels",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          }
        ]
      });

      resolve(true);
    });
  }

  private followUser() {
    this.callbackId = Geolocation.watchPosition({}, ((position, err) => {
      if (this.map) {
        if (!this.userMarker) {
          this.userMarker = new google.maps.Marker({
            position: this.initialPosition,
            icon: {
              url: '/assets/ash-ketchum.png',
              scaledSize: new google.maps.Size(50, 50),
              origin: new google.maps.Point(0,0),
              anchor: new google.maps.Point(25,25)
            },
            map: this.map
          });
        }

        if (!position) {
          return;
        }

        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        this.userMarker.setPosition(latLng);
        this.generateRandomPokemonAroundUser();
        this.map.setZoom(16);
        this.map.panTo(latLng);
      }
    }));
  }

  private stopFollowingUser() {
    if (this.callbackId) {
      Geolocation.clearWatch({id: this.callbackId}).then(() => {
      });
    }
  }

  private generateRandomPokemonAroundUser() {
    let markersInView = this.getPokemonMarkersInView();
    let markersToAdd = 10 - markersInView.length;

    for (let i = 0; i < markersToAdd; i++) {
      let heading = (i * 36);
      let distance = Math.round(Math.random() * 400) + 100;

      let latlng = google.maps.geometry.spherical.computeOffset(this.userMarker.getPosition(), distance, heading);

      let marker = new google.maps.Marker({
        position: latlng,
        map: this.map
      });

      this.pokemonMarkers.push(marker);

      this.pokemonService.getRandomPokemon().subscribe(pokemon => {
        marker.setIcon({
          url: this.pokemonService.getPokemonImage(pokemon.id),
          scaledSize: new google.maps.Size(50, 50),
          anchor: new google.maps.Point(25, 25)
        });

        marker.addListener('click', () => {
          this.catchPokemon(pokemon);
        });
      });
    }
  }

  private getPokemonMarkersInView(): google.maps.Marker[] {
    let markers = [];
    let bounds = this.map.getBounds();

    for(let marker of this.pokemonMarkers) {
      if (bounds.contains(marker.getPosition())) {
        markers.push(marker);
      }
    }

    return markers;
  }

  private catchPokemon(pokemon: Pokemon) {
    this.router.navigate(['/tabs/map/catch-pokemon/', pokemon.id]);
  }
}
