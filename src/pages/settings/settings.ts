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

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public storage: Storage, private alertCtrl: AlertController ) {
  }

  copyrightNoticeButtonOnClick() {
    this.navCtrl.push(CopyrightNoticePage);
  }

  languageSelect() {
    let langSelect = this.alertCtrl.create();
    langSelect.setTitle('Language Select');

    langSelect.addInput({
      type: 'radio',
      label: '日本語',
      value: 'ja_JP',
      checked: true
    });

    langSelect.addInput({
      type: 'radio',
      label: 'English',
      value: 'en_US'
    });

    langSelect.addInput({
      type: 'radio',
      label: '中文(简体)',
      value: 'zh_CN'
    });

    langSelect.addInput({
      type: 'radio',
      label: '中文(繁體)',
      value: 'zh_TW'
    });

    langSelect.addInput({
      type: 'radio',
      label: '한국어',
      value: 'ko_KR'
    });

    langSelect.addButton('Cancel');
    langSelect.addButton({
      text: 'OK',
      handler: (data: any) => {
        this.storage.set('language', data);
      }
    });

    langSelect.present();
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
