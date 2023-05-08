import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

import { UsersPage } from "./users";
import { UsersPageRoutingModule } from "./users-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { RandomColorPipe } from "../../shared/pipes/colorRandomizer.pipe";
import { NavigationService } from "../../services/navigation.service";
import { BackRouteBtnModule } from "../../shared/components/back-route-btn/back-route-btn.module";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddEditShippingDestinationModule } from "../../shared/components/add-edit-shipping-destination/add-edit-shipping-destination.module";
import { IonicSelectableModule } from "@ionic-selectable/angular";
import { PipeModule } from "../../shared/pipes/pipe.module";
import { SearchLineModule } from "../../shared/components/search-line/search-line.module";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HttpClientModule,
    UsersPageRoutingModule,
    BackRouteBtnModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    IonicSelectableModule,
    AddEditShippingDestinationModule,
    PipeModule,
    SearchLineModule,
  ],
  declarations: [UsersPage],
  providers: [NavigationService, TranslateService],
})
export class UsersModule {}
