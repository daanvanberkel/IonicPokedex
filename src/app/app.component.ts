import {Component, OnInit} from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {Plugins, PushNotification, PushNotificationActionPerformed, PushNotificationToken} from '@capacitor/core';

const { PushNotifications } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit(): void {
    PushNotifications.register();

    PushNotifications.addListener('registration',
        (token: PushNotificationToken) => {
          console.log('Push registration success, token: ' + token.value);
        }
    );

    PushNotifications.addListener('registrationError',
        (error: any) => {
          console.log('Error on registration: ' + JSON.stringify(error));
        }
    );

    PushNotifications.addListener('pushNotificationReceived',
        (notification: PushNotification) => {
          console.log('Push received: ' + JSON.stringify(notification));
        }
    );

    PushNotifications.addListener('pushNotificationActionPerformed',
        (notification: PushNotificationActionPerformed) => {
          console.log('Push action performed: ' + JSON.stringify(notification));
        }
    );
  }
}
