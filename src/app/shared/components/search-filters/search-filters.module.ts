import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { SearchFiltersComponent } from "./search-filters.component";
import { IonicSelectableModule } from "@ionic-selectable/angular";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [SearchFiltersComponent],
  exports: [SearchFiltersComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SearchFiltersModule {}
