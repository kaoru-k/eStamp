import { Component } from '@angular/core';
import { NavController, AlertController, ModalController, PopoverController } from 'ionic-angular';
import { Storage } from '@ionic/storage'
import { GoogleMaps, GoogleMap, GoogleMapOptions, GoogleMapsEvent } from '@ionic-native/google-maps';

import { GetStampPage } from '../get-stamp/get-stamp';
import { MapPopoverPage } from '../map-popover/map-popover';

// declare var google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  visited: boolean = true;
  nonVisited: boolean = true;
  map: GoogleMap;
  // @ViewChild('map') mapElement: ElementRef;
  // map: any; // loadMapJS

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public modalCtrl: ModalController, private popoverCtrl: PopoverController, public storage: Storage ) {
  }
  
  ionViewDidLoad(){
    this.loadMap();
    // this.loadMapJS();
  }

  ionViewDidEnter(){
    this.putMarkers();
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
    this.storage.get('spotList').then((csvData) => {
      csvData.forEach((row) =>{
        if (this.visited == true && row['Get'] == true) {
          this.map.addMarkerSync({
            title: row['Name'] + "\n入手日時：" + row['GetDate'],
            icon: "red",
            position: {
              lat: row['Latitude'],
              lng: row['Longitude']
            }
          });
        } else if (this.nonVisited == true && row['Get'] != true) {
          this.map.addMarkerSync({
            title: row['Name'],
            icon: "blue",
            position: {
              lat: row['Latitude'],
              lng: row['Longitude']
            }
          });
        };

      });
    });
  }

  getStampButtonOnClick() {
    let myModal = this.modalCtrl.create(GetStampPage);
    myModal.present();
    myModal.onDidDismiss(data => {
      this.map.clear().then(() => {
        this.putMarkers();
      });
    });
  }

  showPopover(ev: UIEvent) {
    let popover = this.popoverCtrl.create(MapPopoverPage, {
      visited: this.visited,
      nonVisited: this.nonVisited
    });
    popover.present({
      ev: ev
    });
    popover.onDidDismiss(data => {
      if (data) {
        console.log(data);
        this.visited = data.visited;
        this.nonVisited = data.nonVisited;
        this.map.clear().then(() => {
          this.putMarkers();
        });
      }
    })
  }
}