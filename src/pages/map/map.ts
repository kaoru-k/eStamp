import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController) {
  
  }

  ionViewDidLoad(){
    this.loadMapJS();
  }

  loadMapJS() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center: {lat: 34.075, lng: 134.515},
      zoom: 8
    });
  }

}
