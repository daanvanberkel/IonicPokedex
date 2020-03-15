import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PokemonListComponent} from './pokemon-list/pokemon-list.component';
import {IonicModule} from '@ionic/angular';



@NgModule({
    declarations: [
        PokemonListComponent
    ],
    exports: [
        PokemonListComponent
    ],
    imports: [
        CommonModule,
        IonicModule
    ]
})
export class CommonComponentsModule { }
