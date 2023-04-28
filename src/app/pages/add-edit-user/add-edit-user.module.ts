import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

import { AddEditUserPage } from "./add-edit-user";
import { AddEditUserPageRoutingModule } from "./add-edit-user-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AddEditUserPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [AddEditUserPage],
})
export class AddEditUserModule {}
