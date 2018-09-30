import { Component } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { File } from '@ionic-native/file';

/**
 * Generated class for the StampDialogPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-stamp-dialog',
  templateUrl: 'stamp-dialog.html',
})
export class StampDialogPage {
  public stampType: string;
  public stampNo: string;
  public stampLocation: string;
  public stampImage: string;
  public stampGetDate: string;
  public stampText: string;
  public likeCount: string = "-";
  public likeButtonIsEnable: boolean = true;
  stampId: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private socialSharing: SocialSharing, private alertCtrl: AlertController, public http: Http) {
  }

  ngOnInit() {
    if (this.navParams.data) {
      this.stampType = this.navParams.data.type;
      this.stampId = this.navParams.data._id;
      this.stampNo = this.navParams.data.id;
      this.stampLocation = this.navParams.data.name;
      this.stampImage = this.navParams.data.img;      
      this.stampGetDate = this.navParams.data.date;
      this.stampText = this.navParams.data.text;
    }
    this.http.get('https://estamp-tokushima.appspot.com/api/dev/like/'+this.stampId).subscribe(res => {
      this.likeCount = res.json()['data']['likeCount']
    }, error => {
      this.likeCount = "エラー"
      console.log(JSON.stringify(error));
    });
  }

  questionButtonOnClick() {
    let result;
    let alert = this.alertCtrl.create({
      title: 'アンケート',
      message: '施設内、もしくは近くにトイレはありますか',
      buttons: [
        {
          text: 'はい',
          handler: () => {
            result = 1;
          }
        },
        {
          text: 'いいえ',
          handler: () => {
            result = 0;
          }
        },
        {
          text: 'わからない',
          handler: () => {
            result = -1;
          }
        }
      ]
    });
    alert.present();
  }

  shareButtonOnClick() {
    this.socialSharing.share(
    "とくしまeスタンプラリーで「"+ this.stampLocation + "」のスタンプをゲット！" ,
    null,
    null,
    "https://estamp-tokushima.appspot.com"
    )
  }

  likeButtonOnClick() {
    let headers = new Headers({
      'Content-Type': 'application/json'
    })
    let options = new RequestOptions({headers:headers})
    this.http.put('https://estamp-tokushima.appspot.com/api/dev/like/'+this.stampId,null).subscribe(res => {
      let alert = this.alertCtrl.create({
        title: "いいね完了",
        message: "「" + this.stampLocation + "」をいいねしました！",
        buttons:['OK']
      })
      alert.present().then(() =>{
        this.likeCount += 1;
        this.likeButtonIsEnable = false;
      })
    }, error => {
      let alert = this.alertCtrl.create({
        title: "エラー",
        message: error,
        buttons:['OK']
      })
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
