import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { NgxPaginationModule } from "ngx-pagination";
import { ModeInputDirective } from "./mode-input.directive";
import { VarDirective } from "./var.directive";
import { NgInitDirective } from "./ng-init.directive";

@NgModule({
  declarations: [
    ModeInputDirective,
    VarDirective,
    NgInitDirective,
    NgInitDirective,
  ],
  exports: [ModeInputDirective, VarDirective],
})
export class DirectivesModule {}
