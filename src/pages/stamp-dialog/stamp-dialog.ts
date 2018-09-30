import { Component } from '@angular/core';
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
  public likeCount: number = 0;

  stampId: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private socialSharing: SocialSharing, private alertCtrl: AlertController, private file: File) {
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
  }

  questionButtonOnClick() {
    let alert = this.alertCtrl.create({
      title: 'アンケート',
      message: '施設内、もしくは近くにトイレはありますか',
      buttons: [
        {
          text: 'はい',
          handler: () => {
            console.log(this.stampId + 'はい clicked');
          }
        },
        {
          text: 'いいえ',
          handler: () => {
            console.log(this.stampId + 'いいえ clicked');
          }
        },
        {
          text: 'わからない',
          handler: () => {
            console.log(this.stampId + 'わからない clicked');
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
    this.stampImage,
    "https://estamp-tokushima.appspot.com"
    )
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
