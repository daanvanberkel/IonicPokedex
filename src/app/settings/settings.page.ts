import { Component, OnInit } from '@angular/core';
import {AlertController, ToastController} from '@ionic/angular';
import {MyPokemonService} from '../services/my-pokemon.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
      private alertController: AlertController,
      private myPokemonService: MyPokemonService,
      private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  resetMyPokemon() {
    this.alertController.create({
      header: 'Reset mijn pokemon',
      message: 'Weet je zeker dat je al je gevangen pokemon wilt verwijderen?',
      buttons: [
        {
          role: 'cancel',
          text: 'Annuleren'
        },
        {
          role: 'primary',
          text: 'Verwijderen',
          handler: () => {
            this.myPokemonService.resetAllPokemon().subscribe(() => {
              this.toastController.create({
                message: 'Je pokemons zijn gereset.',
                color: 'success',
                duration: 2000
              }).then(toast => toast.present());
            });
          }
        }
      ]
    }).then(alert => alert.present());
  }
}
