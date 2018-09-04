import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { MapPage } from '../pages/map/map';
import { StampBookPage } from '../pages/stamp-book/stamp-book';
import { SettingsPage } from '../pages/settings/settings';
import { TabsPage } from '../pages/tabs/tabs';
import { GetStampPage } from '../pages/get-stamp/get-stamp';

import { Geolocation } from '@ionic-native/geolocation';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { GoogleMaps } from "@ionic-native/google-maps";
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    MapPage,
    StampBookPage,
    SettingsPage,
    TabsPage,
    GetStampPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapPage,
    StampBookPage,
    SettingsPage,
    TabsPage,
    GetStampPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    BarcodeScanner,
    GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
