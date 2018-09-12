import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { ViewController } from 'ionic-angular/navigation/view-controller';

/**
 * Generated class for the MapPopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-map-popover',
  template:`
    <ion-list>
    <ion-item>
    <ion-label>未訪問</ion-label>
    <ion-checkbox [(ngModel)]="nonVisited" (ionChange)="close()" color="red"></ion-checkbox>
    </ion-item>
    <ion-item>
      <ion-label>訪問済み</ion-label>
      <ion-checkbox [(ngModel)]="visited" (ionChange)="close()" color="blue"></ion-checkbox>
    </ion-item>
  </ion-list>`
})
export class MapPopoverPage {
  public visited: boolean;
  public nonVisited: boolean;

  constructor(public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ngOnInit() {
    if (this.navParams.data) {
      this.visited = this.navParams.data.visited;
      this.nonVisited = this.navParams.data.nonVisited;
    }
  }

  close() {
    let data = {visited: this.visited, nonVisited: this.nonVisited}
    this.viewCtrl.dismiss(data);
  }
}
