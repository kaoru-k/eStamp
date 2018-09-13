import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { GetStampPage } from '../get-stamp/get-stamp';
import { StampDialogPage } from '../stamp-dialog/stamp-dialog';
import { Storage } from '@ionic/storage'

@Component({
  selector: 'page-stamp-book',
  templateUrl: 'stamp-book.html',
})
export class StampBookPage {
  public stampList: any[] = [];
  public stampCount: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public storage: Storage) {
  }

  ionViewDidLoad() {
    this.storage.get('spotList').then((csvData) => {
      this.stampCount = 0;
      csvData.forEach((row) =>{
        if (row['Get'] == true) {this.stampCount++}
        this.stampList.push({
          ID: "No." + ("000" + row['ID']).slice(-3),
          Name: row['Name'],
          Get: true,
          GetDate: row['GetDate'],
          img: "assets/imgs/stamp/stamp_sample.png"
        });
      });
    });
  }

  stampOnClick(id, name, get, date) {
    if (get == true) {
      let myModal = this.modalCtrl.create(StampDialogPage, {id: id, name: name, date: date});
      myModal.present();
    }
  }

  getStampButtonOnClick() {
    let myModal = this.modalCtrl.create(GetStampPage, {});
    myModal.present();
  }
  
}
