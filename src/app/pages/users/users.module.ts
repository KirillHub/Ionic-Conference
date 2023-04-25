import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

import { UsersPage } from "./users";
import { UsersPageRoutingModule } from "./users-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { RandomColorPipe } from "../../../shared/pipes/colorRandomizer.pipe";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HttpClientModule,
    UsersPageRoutingModule,
  ],
  declarations: [UsersPage, RandomColorPipe],
  bootstrap: [UsersPage],
})
export class UsersModule {}
