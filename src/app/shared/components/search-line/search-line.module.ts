import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { SearchFiltersModule } from "../search-filters/search-filters.module";
import { SearchLineComponent } from "./search-line";
import { PipeModule } from "../../pipes/pipe.module";
import { DirectivesModule } from "../../directives/directives.module";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    SearchFiltersModule,
    DirectivesModule
  ],
  declarations: [SearchLineComponent],
  exports: [SearchLineComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SearchLineModule {}
