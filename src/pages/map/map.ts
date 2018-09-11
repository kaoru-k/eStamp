import { Component } from '@angular/core';
import { NavController, AlertController, Platform } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { GoogleMaps, GoogleMap, GoogleMapOptions, GoogleMapsEvent } from '@ionic-native/google-maps';
import { GetStampPage } from '../get-stamp/get-stamp';
import { PopoverController } from 'ionic-angular/components/popover/popover-controller';
import { MapPopoverPage } from '../map-popover/map-popover';
import { Storage } from '@ionic/storage'


// declare var google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  // @ViewChild('map') mapElement: ElementRef;
  // map: any; // loadMapJS
  map: GoogleMap;
  csvData: any[] = [];
  headerRow: any[] = [];

  constructor(private platform: Platform, public navCtrl: NavController, public alertCtrl: AlertController, public modalCtrl: ModalController, private popoverCtrl: PopoverController, public storage: Storage ) {
    this.platform.ready().then(() => {
      this.loadDB();
      this.loadMap();
    });
  }

  // ionViewDidLoad(){
  //   this.loadMapJS();
  // }

  loadDB() {
    this.storage.get('spotList').then((lists) => {
      this.csvData = lists;
    });
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
        zoom: 12
      },
      controls: {
        'myLocationButton': true,
        'myLocation': true,
      }
    }
    this.map = GoogleMaps.create('map',options);
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.putMarkers();
    });
  }
  
  putMarkers() {
    this.csvData.forEach((row) =>{
      this.map.addMarkerSync({
        title: row['Name'],
        icon: 'blue',
        position: {
          lat: row['Latitude'],
          lng: row['Longitude']
        }
      });
    });
  }

  getStampButtonOnClick() {
    let myModal = this.modalCtrl.create(GetStampPage);
    myModal.present();
  }

  showPopover(ev: UIEvent) {
    let popover = this.popoverCtrl.create(MapPopoverPage, {

    });
    popover.present({
      ev: ev
    });
  }
}