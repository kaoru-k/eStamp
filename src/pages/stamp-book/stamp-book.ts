import { Component } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
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
  public bonusStampList: any[] = [];
  public stampCount: number;
  public bonusStampCount: number;
  public radioButtonValue: string = "all";
  public ranking: string = "--";

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public http: Http, public storage: Storage) {
  }
  
  ionViewDidEnter() {
    this.updateRanking();
    this.updateList();
  }

  updateList() {
    this.storage.get('stampCount').then((count) => {
      this.stampCount = count;
    })
    this.storage.get('bonusStampCount').then((count) => {
      this.bonusStampCount = count;
    })
    this.storage.get('spotList').then((csvData) => {
      this.stampList = [];
      csvData.forEach((row) =>{
        if (row['Get'] == true) {
          this.stampList.push({
            Type: row['Type'],
            _id: row['ID'],
            ID: "No." + ("000" + row['ID']).slice(-3),
            Name: row['Name'],
            img: row['img'],
            Get: row['Get'],
            GetDate: row['GetDate'],
          });
        } else if (this.radioButtonValue == "all") {
          this.stampList.push({
            Type: row['Type'],
            _id: row['ID'],            
            ID: "No." + ("000" + row['ID']).slice(-3),
            Name: row['Name'],
            Get: row['Get'],
            img: "assets/imgs/stamp/stamp_sample_nostamp.png"
          });
        };
      });
    });
    this.storage.get('bonusStampList').then((stampData) => {
      this.bonusStampList = [];
      stampData.forEach((row) => {
        this.bonusStampList.push({
          Type: row['Type'],
          Name: row['Name'],
          img:  row['img'],
          GetDate: row['GetDate'],
          Text: row['Text'],
        })
      }, this)
    });
  };

  updateRanking() {
    this.storage.get('stampCount').then((count) => {
      if (count == '0') {
        this.ranking = "圏外"
      } else {
        let body = JSON.stringify({
          id: "100",
          stampCount: count
        });
        let headers = new Headers({
          'Content-Type': 'application/json'
        })
        let options = new RequestOptions({headers:headers})
        this.http.put('https://estamp-tokushima.appspot.com/api/dev/ranking', body, options).subscribe(res => {
          this.ranking = res.json()['data']['ranking'] + "位"
        }, error => {
          this.ranking = "エラー"
          console.log(JSON.stringify(error));
        });
      }
    })
  }

  stampOnClick(type, _id, id, name, img, get, date, text) {
    if (get == true) {
      let myModal = this.modalCtrl.create(StampDialogPage, {type: type,_id: _id, id: id, name: name,img: img, date: date, text: text});
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
