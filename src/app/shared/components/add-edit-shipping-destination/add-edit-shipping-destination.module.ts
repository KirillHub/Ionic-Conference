import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { AddEditShippingDestinationComponent } from "./add-edit-shipping-destination.component";
import { NgxPaginationModule } from "ngx-pagination";
import { DirectivesModule } from "../../directives/directives.module";
import { FilterToggleModule } from "../filter-toggle/filter-toggle.module";
import { PipeModule } from "../../pipes/pipe.module";
import { IonicSelectableModule } from "@ionic-selectable/angular";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    DirectivesModule,
    IonicSelectableModule,
    FilterToggleModule,
    PipeModule,
  ],
  declarations: [AddEditShippingDestinationComponent],
  exports: [AddEditShippingDestinationComponent],
})
export class AddEditShippingDestinationModule {}
