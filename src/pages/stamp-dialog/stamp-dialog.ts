import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';

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
  public stampNo: string = "No.000";
  public stampLocation: string = "徳島大学";
  public stampGetDate: string = "2018/9/1";

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
