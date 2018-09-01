import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, AlertController, Platform } from 'ionic-angular';
import { GoogleMaps, GoogleMap, MyLocation, LocationService, GoogleMapOptions } from '@ionic-native/google-maps';

// declare var google; // loadMapJS

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  // map: any; // loadMapJS
  map: GoogleMap;

  constructor(private platform: Platform, public navCtrl: NavController, public alertCtrl: AlertController) {
    this.platform.ready().then(() => {
      this.loadMap();
    });
  }

  ionViewDidLoad(){
    // this.loadMapJS();
    this.loadMap();
  }

  // loadMapJS() {
  //   this.map = new google.maps.Map(this.mapElement.nativeElement, {
  //     center: {lat: 34.075, lng: 134.515},
  //     zoom: 8
  //   });
  // }

  loadMap() {
    LocationService.getMyLocation().then((myLocation: MyLocation) => {
      let options: GoogleMapOptions = {
        camera: {
          target: myLocation.latLng
        },
        controls: {
          'myLocationButton': true,
          'myLocation': true,
          'zoom': true
        }
      };
      this.map = GoogleMaps.create('map',options);
    });
  }

}
