import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps, GoogleMap, GoogleMapsEvent } from '@ionic-native/google-maps';

declare var google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  // map: GoogleMap;

  constructor(public navCtrl: NavController, public geolocation: Geolocation, public alertCtrl: AlertController) {
  
  }

  ionViewDidLoad(){
    // this.showLocation();
    this.loadMapJS();
    // this.loadMap();
  }

  showLocation() {
    this.geolocation.getCurrentPosition().then((position) => {
      let latlng = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      let alert = this.alertCtrl.create({
        title: 'Lat and Lng',
        subTitle: 'lat = ' + latlng.lat + ' , lng = ' + latlng.lng,
        buttons: ['Close']
      })
      alert.present();
    }).catch((error) => {
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Error getting location' + error,
        buttons: ['Close']
      })
      alert.present();
    });
  }

  loadMapJS() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center: {lat: 34.075, lng: 134.515},
      zoom: 8
    });
  }

  // loadMap() {
  //   console.log('Load Map.');
  //   this.map = GoogleMaps.create('map');
  //   this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
  //     console.log('Map Ready.');
  //   });
  // }

}
