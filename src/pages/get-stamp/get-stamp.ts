import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

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

  constructor(public navCtrl: NavController, private barcodeScanner: BarcodeScanner, public alertCtrl: AlertController) {
  }

  onClick() {
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

}
