import { Component, OnInit } from '@angular/core';
import {MyPokemonService} from '../services/my-pokemon.service';
import {Pokemon} from '../models/pokemon';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-pokemon',
  templateUrl: './my-pokemon.page.html',
  styleUrls: ['./my-pokemon.page.scss'],
})
export class MyPokemonPage implements OnInit {

  myPokemon: Pokemon[];
  reorder = false;

  constructor(
      private myPokemonService: MyPokemonService,
      private router: Router
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadMyPokemon();
  }

  showDetails(pokemonId) {
    this.router.navigate(['/tabs/my-pokemon', pokemonId]);
  }

  loadMyPokemon() {
    this.myPokemonService.getPokemons().subscribe(pokemon => this.myPokemon = pokemon);
  }

  toggleReorder() {
    this.reorder = !this.reorder;
  }
}
