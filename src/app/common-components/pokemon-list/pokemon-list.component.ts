import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Pokemon} from '../../models/pokemon';
import {PokemonService} from '../../services/pokemon.service';
import {MyPokemonService} from '../../services/my-pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {

  @Input() pokemons: Pokemon[];
  @Input() reorder: Boolean = false;
  @Input() deletable: Boolean = false;
  @Output() pokemonClick = new EventEmitter<Pokemon>();

  constructor(
      private pokemonService: PokemonService,
      private myPokemonService: MyPokemonService
  ) { }

  ngOnInit() {}

  onClick(pokemon) {
    this.pokemonClick.emit(pokemon);
  }

  getPokemonImage(pokemon): string {
    return this.pokemonService.getPokemonImage(pokemon.id);
  }

  reorderPokemon($event) {
    this.myPokemonService.reorderPokemon($event.detail.from, $event.detail.to).subscribe(() => {
      $event.target.complete(true);
    });
  }

  onDelete(pokemon) {
    this.myPokemonService.deletePokemon(pokemon.id).subscribe(() => {
      this.pokemons.splice(this.pokemons.indexOf(pokemon), 1);
    });
  }
}
