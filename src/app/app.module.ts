import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { MapPage } from '../pages/map/map';
import { MapPopoverPage } from '../pages/map-popover/map-popover';
import { StampBookPage } from '../pages/stamp-book/stamp-book';
import { SettingsPage } from '../pages/settings/settings';
import { TabsPage } from '../pages/tabs/tabs';
import { GetStampPage } from '../pages/get-stamp/get-stamp';
import { StampDialogPage } from '../pages/stamp-dialog/stamp-dialog';
import { CopyrightNoticePage } from '../pages/copyright-notice/copyright-notice';
import { SafetyEvacuationAreaMapPage } from '../pages/safety-evacuation-area-map/safety-evacuation-area-map';

import { Geolocation } from '@ionic-native/geolocation';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { GoogleMaps } from "@ionic-native/google-maps";
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Device } from '@ionic-native/device'
import { SocialSharing } from '@ionic-native/social-sharing'
import { File } from '@ionic-native/file';


@NgModule({
  declarations: [
    MyApp,
    MapPage,
    MapPopoverPage,
    StampBookPage,
    SettingsPage,
    TabsPage,
    GetStampPage,
    StampDialogPage,
    CopyrightNoticePage,
    SafetyEvacuationAreaMapPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
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
    StampDialogPage,
    CopyrightNoticePage,
    SafetyEvacuationAreaMapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    BarcodeScanner,
    GoogleMaps,
    Device,
    SocialSharing,
    File,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
