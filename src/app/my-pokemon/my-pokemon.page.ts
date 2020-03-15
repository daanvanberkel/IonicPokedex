import { Component, OnInit } from '@angular/core';
import {MyPokemonService} from '../services/my-pokemon.service';
import {Pokemon} from '../models/pokemon';

@Component({
  selector: 'app-my-pokemon',
  templateUrl: './my-pokemon.page.html',
  styleUrls: ['./my-pokemon.page.scss'],
})
export class MyPokemonPage implements OnInit {

  myPokemon: Pokemon[];

  constructor(
      private myPokemonService: MyPokemonService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadMyPokemon();
  }

  loadMyPokemon() {
    this.myPokemonService.getPokemons().subscribe(pokemon => this.myPokemon = pokemon);
  }
}
