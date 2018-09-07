import { Component } from '@angular/core';
import { NavController, AlertController, Platform } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapOptions } from '@ionic-native/google-maps';
import { Http } from '@angular/http';
import * as papa from 'papaparse';


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

  constructor(private platform: Platform, public navCtrl: NavController, public alertCtrl: AlertController, private http: Http) {
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
        zoom: 17
      },
      controls: {
        'myLocationButton': true,
        'myLocation': true,
      }
    }
    this.map = GoogleMaps.create('map',options);
  }
  
  putMarkers() {
    this.map.addMarkerSync({
      title: '徳島大学常三島キャンパス',
      position: {
        lat: 34.077,
        lng: 134.560
      }
    });
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
}