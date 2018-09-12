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
      this.loadCSV().then(() => {
        this.platform.ready().then(() => {
          // Okay, so the platform is ready and our plugins are available.
          // Here you can do any higher level native things you might need.
          this.rootPage = TabsPage;
          this.statusBar.styleDefault();
          this.splashScreen.hide();
        });
      });
    });

  }

  async loadCSV() {
    // this.storage.clear();
    this.storage.get('spotList').then((items) => {
      if (!items) {
        console.log("loadCSV()");
        this.http.get('/assets/data/kankoshisetsu_edit.csv').subscribe(res => {
          let csvData = [];
          papa.parse(res['_body'] || '',{header: true}).data.forEach(function(row) {
            row.Get = false;
            row.GetDate = "";
            csvData.push(row);
          }, this);
          this.storage.set('spotList', csvData);
        });
      }
    });
  }
}