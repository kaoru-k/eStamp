import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, AlertController, Platform } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapOptions, Marker } from '@ionic-native/google-maps';
import { Storage } from '@ionic/storage'

// declare var google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  // map: any; // loadMapJS
  map: GoogleMap;

  constructor(private platform: Platform, public navCtrl: NavController, public alertCtrl: AlertController, private storage: Storage) {
    this.platform.ready().then(() => {
      this.loadMap();
    });
  }

  ionViewDidLoad(){
    // this.loadMapJS();
  }

  // loadMapJS() {
  //   this.map = new google.maps.Map(this.mapElement.nativeElement, {
  //     center: {lat: 34.075, lng: 134.515},
  //     zoom: 8
  //   });
  // }

  loadMap() {
    let options: GoogleMapOptions = {
      camera: {
        target: {
          lat: 34.077,
          lng: 134.560
        },
        zoom: 17
      },
      controls: {
        'myLocationButton': true,
        'myLocation': true,
      }
    }
    this.map = GoogleMaps.create('map',options);
    this.map.addMarker({
      title: '徳島大学常三島キャンパス',
      icon: 'blue',
      position: {
        lat: 34.077,
        lng: 134.560
      }
    }).catch((err) =>{
      alert(err);
    });

    this.storage.set('language','ja_JP')
  }

  buttonClick() {
    this.storage.get('language').then((val) => {
      // alert(val);
      let username = val;
    })
  }
}