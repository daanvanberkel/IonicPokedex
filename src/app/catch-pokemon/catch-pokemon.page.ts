import { Component, OnInit } from '@angular/core';
import {Pokemon} from '../models/pokemon';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-catch-pokemon',
  templateUrl: './catch-pokemon.page.html',
  styleUrls: ['./catch-pokemon.page.scss'],
})
export class CatchPokemonPage implements OnInit {

  pokemon: Pokemon;

  constructor(
      private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.pokemon = data.pokemon;
    });
  }

}
