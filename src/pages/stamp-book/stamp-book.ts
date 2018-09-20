import { Component } from '@angular/core';
import { Http } from '@angular/http';
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
  public radioButtonValue: string = "all";
  public ranking: number = 1;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public http: Http, public storage: Storage) {
  }
  
  ionViewDidEnter() {
    this.updateRanking();
    this.updateList();
  }

  updateList() {
    this.storage.get('spotList').then((csvData) => {
      this.stampList = [];
      this.stampCount = 0;
      csvData.forEach((row) =>{
        if (row['Get'] == true) {
          this.stampCount++
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
    this.http.post('https://<server_url>/dev/ranking', '{stampCount:2}').subscribe(res => {
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
      this.updateRanking();
      this.updateList();
    });
  }
  
}
