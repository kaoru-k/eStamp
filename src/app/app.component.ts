import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage'
import * as papa from 'papaparse';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage:any = TabsPage;
  rootPage: any;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public http: Http, public storage: Storage) {
    this.initializeApp();
  }

  initializeApp() {
    this.storage.ready().then(() => {
      if (!this.storage.get('spotList')) {
        this.loadCSV();
      }
    }).then(() => {
      this.platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        this.rootPage = TabsPage;
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      });
    })

  }

  loadCSV() {
    console.log("loadCSV");
    this.extractData(this.http.get('/assets/data/kankoshisetsu_edit.csv'));
  }

  private extractData(res) {
    let csvData = res['_body'] || '';
    this.storage.set('spotList', papa.parse(csvData,{header:true}).data);
  }
}
