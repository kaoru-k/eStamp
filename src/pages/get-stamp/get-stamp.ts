import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Geolocation } from '@ionic-native/geolocation';
import * as papa from 'papaparse';
import { ViewController } from 'ionic-angular/navigation/view-controller';

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
  public target: string = "";
  public distance: string = "";
  public updataLocationButtonCaption: string = "更新中...";
  public getStampButtonIsEnabled: boolean = false;

  csvData: any[] = [];
  headerRow: any[] = [];
  cd = new CalcDistance;

  constructor(public navCtrl: NavController, private barcodeScanner: BarcodeScanner, public alertCtrl: AlertController, public geolocation: Geolocation, private http: Http, public viewCtrl: ViewController) {
  }

  ionViewWillEnter() {
    this.loadCSV();
    this.updateDistance();
    this.updataLocationButtonCaption = "位置情報更新";
  }

  loadCSV() {
    this.http.get('/assets/data/kankoshisetsu_edit.csv').subscribe(
      data => this.extractData(data),
    );
  }

  private extractData(res) {
    let csvData = res['_body'] || '';
    this.csvData = papa.parse(csvData,{header:true}).data;
  }

  updateDistance() {
    this.geolocation.getCurrentPosition().then((position) => {
      let latlng = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      this.target = this.csvData[0]['Name'];
      let distance = this.cd.getDistance({lat: this.csvData[0]['Latitude'], lng: this.csvData[0]['Longitude']}, latlng) - 200;
      if (distance > 1000) {
        this.distance = "約" + (distance / 1000).toFixed(1) + "km";
      } else if (distance <= 200) {
        this.distance = "到着しました!"
        this.getStampButtonIsEnabled = true;
      } else {
        this.distance = "約" + Math.round(distance).toString() + "m";
      }

    }).catch((error) => {
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Error getting location' + error,
        buttons: ['Close']
      })
      alert.present();
    });
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

  updateLocationButtonOnClick() {
    this.updataLocationButtonCaption = "更新中...";
    this.updateDistance();
    this.updataLocationButtonCaption = "位置情報更新";
  }

  getStampButtonOnClick() {
    this.getStampButtonIsEnabled = !this.getStampButtonIsEnabled;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}

export class CalcDistance {
  getDistance(target, current) {
    let radTarget = this.deg2rad(target);
    let radCurrent = this.deg2rad(current);
    
    let radLatDiff = radTarget.lat - radCurrent.lat;
    let radLngDiff = radTarget.lng - radCurrent.lng;
    let radLatAvg  = (radTarget.lat + radCurrent.lat) / 2;
    
    const rx = 6378137.0;  // 赤道半径
    const ry = 6356752.314245 // 極半径(WGS84)
    const eSquare = (Math.pow(rx, 2) - Math.pow(ry, 2)) / Math.pow(rx, 2); // 離心率の2乗
    let w = 1 - eSquare * Math.sin(radLatAvg);
    let m = rx * (1 - eSquare) / Math.pow(w, 3)
    let n = rx / w;

    return Math.sqrt(Math.pow(radLatDiff * m, 2) + Math.pow(radLngDiff * n * Math.cos(radLatAvg), 2));
  }

  deg2rad(deg) {
    return {
      lat: deg.lat * (Math.PI / 180),
      lng: deg.lng * (Math.PI / 180)
    };
  }
}