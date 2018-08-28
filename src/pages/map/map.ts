import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {
  GoogleMaps, GoogleMap, GoogleMapsEvent
} from '@ionic-native/google-maps';


@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  
  map: GoogleMap;

  constructor(public navCtrl: NavController) {
  
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {

    this.map = GoogleMaps.create('map');

    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      console.log('GoogleMaps Loaded.');
    });
  }

}
