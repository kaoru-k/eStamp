import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
  public stampNo: string;
  public stampLocation: string;
  public stampGetDate: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ngOnInit() {
    if (this.navParams.data) {
      this.stampNo = this.navParams.data.id;
      this.stampLocation = this.navParams.data.name;
      this.stampGetDate = this.navParams.data.date;
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
