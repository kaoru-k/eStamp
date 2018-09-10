import { Component } from '@angular/core';
import { NavController, AlertController, Platform } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { GoogleMaps, GoogleMap, GoogleMapOptions, GoogleMapsEvent } from '@ionic-native/google-maps';
import { Http } from '@angular/http';
import * as papa from 'papaparse';
import { GetStampPage } from '../get-stamp/get-stamp';
import { PopoverController } from 'ionic-angular/components/popover/popover-controller';
import { MapPopoverPage } from '../map-popover/map-popover';


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

  constructor(private platform: Platform, public navCtrl: NavController, public alertCtrl: AlertController, private http: Http, public modalCtrl: ModalController, private popoverCtrl: PopoverController ) {
    this.platform.ready().then(() => {
      this.loadCSV();
      this.loadMap();
    });
  }

  // ionViewDidLoad(){
  //   this.loadMapJS();
  // }

  loadCSV() {
    this.http.get('/assets/data/kankoshisetsu_edit.csv').subscribe(
      data => this.extractData(data),
    );
  }

  private extractData(res) {
    let csvData = res['_body'] || '';
    let parsedData = papa.parse(csvData).data;
 
    this.headerRow = parsedData[0];
 
    parsedData.splice(0, 1);
    this.csvData = parsedData;
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
        title: row[1],
        icon: 'blue',
        position: {
          lat: row[3],
          lng: row[4]
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