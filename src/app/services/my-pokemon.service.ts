import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';
import {Observable} from 'rxjs';
import {Pokemon} from '../models/pokemon';

const STORAGE_KEY = 'my-pokemon';

@Injectable({
  providedIn: 'root'
})
export class MyPokemonService {

  constructor(
      private storage: Storage
  ) { }

  getPokemons(): Observable<Pokemon[]> {
    return new Observable<Pokemon[]>(subscriber => {
      this.storage.get(STORAGE_KEY).then(result => {
        if (!result) {
          subscriber.next([]);
          subscriber.complete();
          return;
        }

        subscriber.next(result.map(item => item as Pokemon));
        subscriber.complete();
      }).catch(error => subscriber.error(error));
    });
  }

  getPokemon(id: string): Observable<Pokemon> {
    return new Observable<Pokemon>(subscriber => {
      this.storage.get(STORAGE_KEY).then(result => {
        if (!result) {
          subscriber.next(null);
          subscriber.complete();
          return;
        }

        for (let item of result) {
          if (item.id === id) {
            subscriber.next(item);
            subscriber.complete();
            return;
          }
        }

        subscriber.next(null);
        subscriber.complete();
      }).catch(error => subscriber.error(error));
    });
  }

  addPokemon(pokemon: Pokemon): Observable<void> {
    return new Observable<void>(subscriber => {
      this.storage.get(STORAGE_KEY).then(result => {
        if (!result) {
          result = [];
        }

        result.push(pokemon);

        this.storage.set(STORAGE_KEY, result).then(() => {
          subscriber.next();
          subscriber.complete()
        }).catch(error => subscriber.error(error));
      }).catch(error => subscriber.error(error));
    });
  }

  deletePokemon(id: string): Observable<void> {
    return new Observable<void>(subscriber => {
      this.storage.get(STORAGE_KEY).then(result => {
        if (!result) {
          subscriber.next();
          subscriber.complete();
          return;
        }

        for (let i = 0; i < result.length; i++) {
          if (result[i].id === id) {
            result = result.splice(i, 1);
            break;
          }
        }

        this.storage.set(STORAGE_KEY, result).then(() => {
          subscriber.next();
          subscriber.complete()
        }).catch(error => subscriber.error(error));
      }).catch(error => subscriber.error(error));
    });
  }
}
