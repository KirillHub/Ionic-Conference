import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { BackRouteBtnModule } from "../../shared/components/back-route-btn/back-route-btn.module";
import { ProductsPage } from "./products";
import { ProductsPageRoutingModule } from "./products-routing.module";
import { IonicSelectableModule } from "ionic-selectable";
import { SearchLineModule } from "../../shared/components/search-line/search-line.module";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    BackRouteBtnModule,
    ProductsPageRoutingModule,
    IonicSelectableModule,
    SearchLineModule
  ],
  declarations: [ProductsPage],
})
export class ProductsModule {}
