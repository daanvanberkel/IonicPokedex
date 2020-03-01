import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Pokemon} from '../models/pokemon';
import {Observable} from 'rxjs';
import {PokemonService} from '../services/pokemon.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonResolverService implements Resolve<Pokemon> {

  constructor(
      private pokemonService: PokemonService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Pokemon> | Promise<Pokemon> | Pokemon {
    return this.pokemonService.getPokemon(route.paramMap.get('id'));
  }
}
