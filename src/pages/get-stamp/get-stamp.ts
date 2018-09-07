import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Geolocation } from '@ionic-native/geolocation';
import * as papa from 'papaparse';

/**
 * Generated class for the GetStampPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-get-stamp',
  templateUrl: 'get-stamp.html',
})
export class GetStampPage {
  csvData: any[] = [];
  headerRow: any[] = [];

  constructor(public navCtrl: NavController, private barcodeScanner: BarcodeScanner, public alertCtrl: AlertController, public geolocation: Geolocation, private http: Http) {
  }

  ionViewWillEnter() {
    this.loadCSV();
  }

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

  qrButtonOnClick() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      let alert = this.alertCtrl.create({
        title: 'Barcode Data',
        subTitle: barcodeData.text,
        buttons: ['Close']
      });
      alert.present();
     }).catch((err) => {
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Error' + err,
        buttons: ['Close']
      })
      alert.present();
    });
  }

  getLocationButtonOnClick() {
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

  csvButtonOnClick() {
    let alert = this.alertCtrl.create({
      title: 'CSV Data',
      subTitle: this.csvData[0],
      buttons: ['Close']
    })
    alert.present();
  }

}
