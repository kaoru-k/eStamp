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
  public distanceString: string = "";
  public updateLocationButtonCaption: string = "更新中...";
  public updateLocationButtonIsEnabled: boolean = false;
  public getStampButtonIsEnabled: boolean = false;
  public sortData: any[] = [];
  
  distance: number = 0;
  csvData = [];
  cd = new CalcDistance;

  constructor(public navCtrl: NavController, private barcodeScanner: BarcodeScanner, public alertCtrl: AlertController, public geolocation: Geolocation, public viewCtrl: ViewController, public storage: Storage ) {
    this.storage.get('spotList').then((lists) => {
      this.csvData = lists;
      this.updateDistance();
    });
  }

  updateDistance() {
    this.updateLocationButtonCaption = "更新中...";
    this.updateLocationButtonIsEnabled = false;
    this.geolocation.getCurrentPosition().then((position) => {
      let latlng = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      this.sortData = [];
      this.csvData.forEach(function(row){
        let distance = this.cd.getDistance({lat: row['Latitude'], lng: row['Longitude']}, latlng);
        let distanceString = "";
        if (distance > 1000) {
          distanceString = "約" + (distance / 1000).toFixed(1) + "km";
        } else {
          distanceString = "約" + Math.round(distance).toString() + "m";
        };
        this.sortData.push({
          ID: row['ID'],
          Name: row['Name'],
          Distance: distance,
          DistanceString: distanceString
        });
      },this);
      this.sortData.sort(function(a,b){return a['Distance'] - b ['Distance']});
      this.target = this.sortData[0]['Name'];
      this.distance = this.sortData[0]['Distance'] - 200;
      if (this.distance > 1000) {
        this.distanceString = "約" + (this.distance / 1000).toFixed(1) + "km";
      } else if (this.distance <= 200) {
        this.distanceString = "到着しました!"
        this.getStampButtonIsEnabled = true;
      } else {
        this.distanceString = "約" + Math.round(this.distance).toString() + "m";
      }
      this.updateLocationButtonCaption = "位置情報更新";
      this.updateLocationButtonIsEnabled = true;
    }).catch((error) => {
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Error getting location' + error,
        buttons: ['Close']
      })
      alert.present();
      this.updateLocationButtonCaption = "位置情報更新";
      this.updateLocationButtonIsEnabled = true;
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
    this.updateDistance();
  }

  getStampButtonOnClick() {
    this.getStampButtonIsEnabled = !this.getStampButtonIsEnabled;
    if (this.distance <= 200) {
      alert("Stamp Get!");
    }
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