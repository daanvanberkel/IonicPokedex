import { Component, OnInit } from '@angular/core';
import {PokemonService} from '../services/pokemon.service';
import {Pokemon} from '../models/pokemon';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.page.html',
  styleUrls: ['./pokedex.page.scss'],
})
export class PokedexPage implements OnInit {

  pokemons: Pokemon[] = [];
  private page = 1;
  private limit = 20;
  private allPokemonLoaded = false;

  constructor(
      private pokemonService: PokemonService,
      private router: Router
  ) { }

  ngOnInit() {
    this.pokemonService.getPokemons(0, this.limit).subscribe(pokemons => this.pokemons = this.pokemons.concat(pokemons));
  }

  loadData(event) {
    if (this.allPokemonLoaded) {
      event.target.complete();
      return;
    }

    this.page++;

    let offset = (this.page - 1) * this.limit;

    this.pokemonService.getPokemons(offset, this.limit).subscribe(pokemons => {
      if (!pokemons.length) {
        this.allPokemonLoaded = true;
      }

      this.pokemons = this.pokemons.concat(pokemons);
      event.target.complete();
    });
  }

  onDetails(id) {
    this.router.navigate([`/tabs/pokemon-details/${id}`]);
  }

  getPokemonItem(id) {
    return this.pokemonService.getPokemonImage(id);
  }
}
