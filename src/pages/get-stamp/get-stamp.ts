import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Geolocation } from '@ionic-native/geolocation';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { Storage } from '@ionic/storage'

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
  public getStampButtonIsEnabled: boolean = true;
  public sortData: any[] = [];

  csvData: any[] = [];
  cd = new CalcDistance;

  constructor(public navCtrl: NavController, private barcodeScanner: BarcodeScanner, public alertCtrl: AlertController, public geolocation: Geolocation, public viewCtrl: ViewController, public storage: Storage ) {
  }
  
  ionViewWillEnter() {
    this.loadDB();
    // this.updateDistance();
    this.updataLocationButtonCaption = "位置情報更新";
  }

  loadDB() {
    this.storage.get('spotList').then((lists) => {
      this.csvData = lists;
      this.updateDistance();
    });
  }

  updateDistance() {
    this.geolocation.getCurrentPosition().then((position) => {
      let latlng = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      this.sortData = [];
      this.csvData.forEach(function(row){
        let distance = this.cd.getDistance({lat: row['Latitude'], lng: row['Longitude']}, latlng);
        if (distance > 1000) {
          distance = "約" + (distance / 1000).toFixed(1) + "km";
        } else {
          distance = "約" + Math.round(distance).toString() + "m";
        };
        this.sortData.push({
          ID: row['ID'],
          Name: row['Name'],
          Distance: distance
        });
      },this);
      this.sortData.sort(function(a,b){return a['Distance'] - b ['Distance']});
      this.target = this.sortData[0]['Name'];
      let distance = this.sortData[0]['Distance'] - 200;
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
    // this.getStampButtonIsEnabled = !this.getStampButtonIsEnabled;
    this.storage.get('spotList').then((items) => {
      alert(items[0]['Name']);
    });
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

  compareLatLng(a, b, position) {
    let ap = Math.pow(a.lat - position.lat, 2) + Math.pow(a.lng - position.lng, 2);
    let bp = Math.pow(b.lat - position.lat, 2) + Math.pow(b.lng - position.lng, 2);
    if (ap > bp) {
      return 1;
    } else if (bp > ap) {
      return -1;
    } else {
      return 0;
    }
  }
}