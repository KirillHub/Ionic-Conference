import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

import { UsersDetailsPage } from "./user-details";
import { HttpClientModule } from "@angular/common/http";
import { RandomColorPipe } from "../../../shared/pipes/colorRandomizer.pipe";
import { UserDetailsPageRoutingModule } from "./user-details-routing.module";
import { BackRouteBtnModule } from "../../shared/components/back-route-btn/back-route-btn.module";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HttpClientModule,
    UserDetailsPageRoutingModule,
    BackRouteBtnModule
  ],
  declarations: [UsersDetailsPage],
})
export class UserDetailsModule {}
