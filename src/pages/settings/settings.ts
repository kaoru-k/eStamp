import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GetStampPage } from '../get-stamp/get-stamp';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController) {
  }

  getStampButtonOnClick() {
    this.navCtrl.push(GetStampPage)
  }

}
