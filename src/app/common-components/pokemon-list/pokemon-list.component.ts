import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Pokemon} from '../../models/pokemon';
import {PokemonService} from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {

  @Input() pokemons: Pokemon[];
  @Output() pokemonClick = new EventEmitter<Pokemon>();

  constructor(
      private pokemonService: PokemonService
  ) { }

  ngOnInit() {}

  onClick(pokemon) {
    this.pokemonClick.emit(pokemon);
  }

  getPokemonImage(pokemon): string {
    return this.pokemonService.getPokemonImage(pokemon.id);
  }
}
