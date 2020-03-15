import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PokedexPage } from './pokedex.page';
import {RouterModule} from '@angular/router';
import {CommonComponentsModule} from '../common-components/common-components.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([{path: '', component: PokedexPage}]),
        CommonComponentsModule
    ],
  declarations: [PokedexPage]
})
export class PokedexPageModule {}
