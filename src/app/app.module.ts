import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { MapPage } from '../pages/map/map';
import { StampBookPage } from '../pages/stamp-book/stamp-book';
import { SettingsPage } from '../pages/settings/settings';
import { TabsPage } from '../pages/tabs/tabs';
import { GetStampPage } from '../pages/get-stamp/get-stamp';
import { StampDialogPage } from '../pages/stamp-dialog/stamp-dialog';

import { Geolocation } from '@ionic-native/geolocation';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { GoogleMaps } from "@ionic-native/google-maps";
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MapPopoverPage } from '../pages/map-popover/map-popover';

@NgModule({
  declarations: [
    MyApp,
    MapPage,
    MapPopoverPage,
    StampBookPage,
    SettingsPage,
    TabsPage,
    GetStampPage,
    StampDialogPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapPage,
    MapPopoverPage,
    StampBookPage,
    SettingsPage,
    TabsPage,
    GetStampPage,
    StampDialogPage
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
