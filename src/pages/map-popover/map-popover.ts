import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular/navigation/nav-params';

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
    <ion-checkbox checked color="red"></ion-checkbox>
    </ion-item>
    <ion-item>
      <ion-label>訪問済み</ion-label>
      <ion-checkbox checked color="blue"></ion-checkbox>
    </ion-item>
  </ion-list>`
})
export class MapPopoverPage {

  constructor(public navParams: NavParams) {
  }

}
