import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pokemon} from '../models/pokemon';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(
      private http: HttpClient
  ) { }

  private url = 'https://pokeapi.co/api/v2';

  getPokemons(offset: number, limit: number): Observable<Pokemon[]> {
      return this.http.get<Pokemon[]>(`${this.url}/pokemon?offset=${offset}&limit=${limit}`)
          .pipe(
              map(
                  response => {
                      for(let i = 0; i < response['results'].length; i++) {
                          let url = response['results'][i].url.trim();

                          if (url.charAt(url.length - 1) == '/') {
                              url = url.substr(0, url.length - 1);
                          }

                          let urlparts = url.split('/');

                          response['results'][i].id = parseInt(urlparts.pop());
                      }

                      return response['results'];
                  }
              )
          );
  }

  getPokemon(id): Observable<Pokemon> {
      return this.http.get<Pokemon>(`${this.url}/pokemon/${id}`);
  }

  getRandomPokemon(): Observable<Pokemon> {
      let offset = Math.round(Math.random() * 963);

      return new Observable<Pokemon>(subscriber => {
          this.http.get<Pokemon[]>(`${this.url}/pokemon?offset=${offset}&limit=1`).subscribe(response => {
              let result = response['results'][0];

              let url = result.url.trim();

              if (url.charAt(url.length - 1) == '/') {
                  url = url.substr(0, url.length - 1);
              }

              let urlparts = url.split('/');

              result.id = parseInt(urlparts.pop());

              this.getPokemon(result.id).subscribe(
                  pokemon => subscriber.next(pokemon),
                  error => subscriber.error(error),
                  () => subscriber.complete()
              );
          },
              error => subscriber.error(error));
      });
  }

  getPokemonImage(id): string {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }
}
