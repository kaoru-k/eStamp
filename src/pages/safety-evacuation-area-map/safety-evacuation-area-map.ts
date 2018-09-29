import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapOptions } from '@ionic-native/google-maps';

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
  googleMap: GoogleMap;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
    let options: GoogleMapOptions = {
      camera: {
        target: {
          lat: 34.077,
          lng: 134.560
        },
        zoom: 12
      },
      controls: {
        'myLocationButton': true,
        'myLocation': true,
      }
    }
    this.googleMap = GoogleMaps.create('map_canvas',options);
    // this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
    //   this.putMarkers();
    // });
  }
  
  putMarkers() {
  
  }

}
