import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { HttpClientModule } from "@angular/common/http";

import { BackRouteBtnComponent } from "./back-route-btn";

@NgModule({
  imports: [CommonModule, RouterModule, IonicModule, HttpClientModule],
  exports: [BackRouteBtnComponent],
  declarations: [BackRouteBtnComponent],
  providers: [],
})
export class BackRouteBtnModule {}
