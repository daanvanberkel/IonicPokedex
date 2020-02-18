import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'map',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pokemon-map/pokemon-map.module').then(m => m.PokemonMapPageModule)
          }
        ]
      },
      {
        path: 'my-pokemon',
        children: [
          {
            path: '',
            loadChildren: () =>
                import('../my-pokemon/my-pokemon.module').then(m => m.MyPokemonPageModule)
          }
        ]
      },
      {
        path: 'pokedex',
        children: [
          {
            path: '',
            loadChildren: () =>
                import('../pokedex/pokedex.module').then(m => m.PokedexPageModule)
          }
        ]
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            loadChildren: () =>
                import('../settings/settings.module').then(m => m.SettingsPageModule)
          }
        ]
      },
      {
        path: 'pokemon-details/:id',
        loadChildren: () => import('../pokemon-details/pokemon-details.module').then( m => m.PokemonDetailsPageModule)
      },
      {
        path: 'catch-pokemon/:id',
        loadChildren: () => import('../catch-pokemon/catch-pokemon.module').then( m => m.CatchPokemonPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/map',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/map',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
