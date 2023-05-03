import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { FilterToggleComponent } from "./filter-toggle.component";
import { SearchFiltersModule } from "../search-filters/search-filters.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ReactiveFormsModule,
    SearchFiltersModule,
    FormsModule,
  ],
  declarations: [FilterToggleComponent],
  exports: [FilterToggleComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FilterToggleModule {}
