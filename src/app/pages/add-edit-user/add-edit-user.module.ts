import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

import { AddEditUserPage } from "./add-edit-user";
import { AddEditUserPageRoutingModule } from "./add-edit-user-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { BackRouteBtnModule } from "../../shared/components/back-route-btn/back-route-btn.module";
import { DirectivesModule } from "../../shared/directives/directives.module";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AddEditUserPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    BackRouteBtnModule,
    DirectivesModule
  ],
  declarations: [AddEditUserPage],
})
export class AddEditUserModule {}
