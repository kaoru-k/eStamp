import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SafetyEvacuationAreaMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-safety-evacuation-area-map',
  templateUrl: 'safety-evacuation-area-map.html',
})
export class SafetyEvacuationAreaMapPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SafetyEvacuationAreaMapPage');
  }

}
