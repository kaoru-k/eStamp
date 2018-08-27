import { Component } from '@angular/core';

import { MapPage } from '../map/map';
import { StampBookPage } from '../stamp-book/stamp-book';
import { SettingsPage } from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MapPage;
  tab2Root = StampBookPage;
  tab3Root = SettingsPage;

  constructor() {

  }
}
