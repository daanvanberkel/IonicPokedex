import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyPokemonPage } from './my-pokemon.page';
import {RouterModule} from '@angular/router';
import {CommonComponentsModule} from '../common-components/common-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: MyPokemonPage }]),
    CommonComponentsModule
  ],
  declarations: [MyPokemonPage]
})
export class MyPokemonPageModule {}
