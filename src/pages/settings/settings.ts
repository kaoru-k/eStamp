import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { GetStampPage } from '../get-stamp/get-stamp';
import { Storage } from '@ionic/storage'

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public storage: Storage) {
  }

  deleteSettings() {
    this.storage.clear();
  }

  getStampButtonOnClick() {
    let myModal = this.modalCtrl.create(GetStampPage);
    myModal.present();
  }

}
