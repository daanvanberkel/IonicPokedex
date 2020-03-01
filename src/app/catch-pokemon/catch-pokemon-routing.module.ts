import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatchPokemonPage } from './catch-pokemon.page';
import {PokemonResolverService} from './pokemon-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: CatchPokemonPage,
    resolve: {
      pokemon: PokemonResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatchPokemonPageRoutingModule {}
