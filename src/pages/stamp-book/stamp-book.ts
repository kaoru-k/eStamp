import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { GetStampPage } from '../get-stamp/get-stamp';
import { StampDialogPage } from '../stamp-dialog/stamp-dialog';

@Component({
  selector: 'page-stamp-book',
  templateUrl: 'stamp-book.html',
})
export class StampBookPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  stampOnClick() {
    let myModal = this.modalCtrl.create(StampDialogPage);
    myModal.present();
  }

  getStampButtonOnClick() {
    let myModal = this.modalCtrl.create(GetStampPage);
    myModal.present();
  }
  
}
