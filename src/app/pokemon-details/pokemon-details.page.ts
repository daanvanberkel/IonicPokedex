import { Component, OnInit } from '@angular/core';
import {Pokemon} from '../models/pokemon';
import {PokemonService} from '../services/pokemon.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.page.html',
  styleUrls: ['./pokemon-details.page.scss'],
})
export class PokemonDetailsPage implements OnInit {

  pokemon: Pokemon;

  constructor(
      private pokemonService: PokemonService,
      private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.pokemonService.getPokemon(params.get('id')).subscribe(pokemon => this.pokemon = pokemon);
      }
    });
  }

  doRefresh(event) {
    this.pokemonService.getPokemon(this.pokemon.id).subscribe(pokemon => {
      this.pokemon = pokemon;
      event.target.complete();
    });
  }

  getPokemonImage(id) {
    return this.pokemonService.getPokemonImage(id);
  }
}
