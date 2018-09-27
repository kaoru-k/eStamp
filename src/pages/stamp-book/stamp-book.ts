import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage'

import { GetStampPage } from '../get-stamp/get-stamp';
import { StampDialogPage } from '../stamp-dialog/stamp-dialog';

@Component({
  selector: 'page-stamp-book',
  templateUrl: 'stamp-book.html',
})
export class StampBookPage {
  public stampList: any[] = [];
  public stampCount: number;
  public radioButtonValue: string = "all";
  public ranking: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public http: Http, public storage: Storage) {
  }
  
  ionViewDidEnter() {
    // this.updateRanking();
    this.updateList();
  }

  updateList() {
    this.storage.get('stampCount').then((count) => {
      this.stampCount = count;
    })
    this.storage.get('spotList').then((csvData) => {
      this.stampList = [];
      csvData.forEach((row) =>{
        if (row['Get'] == true) {
          this.stampList.push({
            ID: "No." + ("000" + row['ID']).slice(-3),
            Name: row['Name'],
            Get: row['Get'],
            GetDate: row['GetDate'],
            img: "assets/imgs/stamp/stamp_sample.png"
          });
        } else if (this.radioButtonValue == "all" ) {
          this.stampList.push({
            ID: "No." + ("000" + row['ID']).slice(-3),
            Name: row['Name'],
            Get: row['Get'],
            img: "assets/imgs/stamp/stamp_sample_nostamp.png"
          });
        };
      });
    });
  };

  updateRanking() {
    let res = {
      id: 0,
      stampCount: this.stampCount
    }
    this.http.post('https://estamp-tokushima.appspot.com/dev/ranking', res).subscribe(res => {
      this.ranking = res['_body']['ranking'];
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
    myModal.onDidDismiss(data => {
      // this.updateRanking();
      this.updateList();
    });
  }
  
}
