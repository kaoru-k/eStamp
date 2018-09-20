import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StampConfirmPage } from './stamp-confirm';

@NgModule({
  declarations: [
    StampConfirmPage,
  ],
  imports: [
    IonicPageModule.forChild(StampConfirmPage),
  ],
})
export class StampConfirmPageModule {}
