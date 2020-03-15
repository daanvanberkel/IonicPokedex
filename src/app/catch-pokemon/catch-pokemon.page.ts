import {Component, OnInit} from '@angular/core';
import {Pokemon} from '../models/pokemon';
import {ActivatedRoute, Router} from '@angular/router';
import {PokemonService} from '../services/pokemon.service';
import {MyPokemonService} from '../services/my-pokemon.service';
import {HapticsImpactStyle, Plugins} from '@capacitor/core';
import {ToastController} from '@ionic/angular';

const { Haptics } = Plugins;

@Component({
  selector: 'app-catch-pokemon',
  templateUrl: './catch-pokemon.page.html',
  styleUrls: ['./catch-pokemon.page.scss'],
})
export class CatchPokemonPage implements OnInit {

  pokemon: Pokemon;
  myPokemon: Pokemon;
  error: string;

  constructor(
      private route: ActivatedRoute,
      private pokemonService: PokemonService,
      private myPokemonService: MyPokemonService,
      private router: Router,
      private toastController: ToastController
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.pokemon = data.pokemon;

      this.myPokemonService.getPokemon(data.pokemon.id).subscribe(pokemon => {
        this.myPokemon = pokemon;
      });
    });
  }

  getImgUrl(): string {
    return this.pokemonService.getPokemonImage(this.pokemon.id);
  }

  catchPokemon() {
    this.error = undefined;

    const caught = Math.round(Math.random() * 100);

    console.log(caught, this.getSpeed());

    if (caught > this.getSpeed()) {
      Haptics.impact({
        style: HapticsImpactStyle.Heavy
      });

      this.toastController.create({
        message: `Je hebt ${this.pokemon.name} gevangen!`,
        duration: 5000
      }).then(toast => {
        toast.present();

        this.router.navigate(['/tabs/map']);
      });

      this.myPokemonService.addPokemon(this.pokemon).subscribe(() => {
        this.myPokemon = this.pokemon;
      });
      return;
    }

    Haptics.impact({
      style: HapticsImpactStyle.Medium
    });
    this.error = `${this.pokemon.name} was je te snel af. Probeer het nog eens!`;
  }

  private getSpeed() {
    let speed = 70;

    for(let stat of this.pokemon.stats) {
      if (stat.stat.name === 'speed') {
        speed = stat.base_stat;
      }
    }

    if (speed > 80) {
      speed = 80;
    }

    return speed;
  }
}
