import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GetStampPage } from '../get-stamp/get-stamp';

@Component({
  selector: 'page-stamp-book',
  templateUrl: 'stamp-book.html',
})
export class StampBookPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  getStampButtonOnClick() {
    this.navCtrl.push(GetStampPage)
  }
  
}
