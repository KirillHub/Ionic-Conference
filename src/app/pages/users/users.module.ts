import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

import { UsersPage } from "./users";
import { UsersPageRoutingModule } from "./users-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { RandomColorPipe } from "../../../shared/pipes/colorRandomizer.pipe";
import { NavigationService } from "../../services/navigation.service";
import { BackRouteBtnModule } from "../../shared/components/back-route-btn/back-route-btn.module";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HttpClientModule,
    UsersPageRoutingModule,
    BackRouteBtnModule,
  ],
  declarations: [UsersPage, RandomColorPipe],
  providers: [NavigationService],
})
export class UsersModule {}
