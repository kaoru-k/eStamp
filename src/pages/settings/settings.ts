import { Component } from '@angular/core';
import { NavController, AlertController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage'

import { GetStampPage } from '../get-stamp/get-stamp';
import { CopyrightNoticePage } from '../copyright-notice/copyright-notice'

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public storage: Storage, private alertCtrl: AlertController) {
  }

  copyrightNoticeButtonOnClick() {
    this.navCtrl.push(CopyrightNoticePage);
  }

  deleteSettings() {
    let deleteConfirm = this.alertCtrl.create({
      title: '設定の消去',
      message: '設定を全消去してもよろしいですか？',
      buttons: [
        {
          text: 'キャンセル',
          role: 'cancel',
          handler: () => {
            alert("キャンセルしました");
          }
        },
        {
          text: '消去',
          handler: () => {
            alert("アプリを再起動してください");
            this.storage.remove('ID');
          }
        }
      ]
    });
    deleteConfirm.present();
  }

  getStampButtonOnClick() {
    let myModal = this.modalCtrl.create(GetStampPage);
    myModal.present();
  }

}
