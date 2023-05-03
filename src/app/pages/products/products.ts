import { map, filter, takeUntil, tap } from "rxjs/operators";
import { Observable, of, pipe, Subject } from "rxjs";
import { Component, HostListener, OnDestroy, OnInit } from "@angular/core";

import { Product } from "../../interfaces/products";
import { ProductsService } from "../../services/products.sevice";
import { ModalController } from "@ionic/angular";
import { ShippingDestination } from "../../models-entity/ShippingDestination";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { AddEditShippingDestinationComponent } from "../../shared/components/add-edit-shipping-destination/add-edit-shipping-destination.component";

@Component({
  selector: "products",
  templateUrl: "products.html",
  styleUrls: ["./products.scss"],
})
export class ProductsPage implements OnInit {
  products$: Observable<Product[]> = of([]);
  countryList: any[];
  productForm: FormGroup;

  constructor(
    private products: ProductsService,
    private modalController: ModalController,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.products$ = this.products.getProducts();
  }

  getProductsFromService() {}

  createShippingDestinationForm(shipD?: ShippingDestination): AbstractControl {
    return this.formBuilder.group({
      id: shipD ? shipD.shippingDestinationId : null,
      address: [shipD ? shipD.address : "", Validators.required],
      name: [shipD ? shipD.name : "", Validators.required],
      attention: [shipD ? shipD.attention : "", Validators.required],
      telephone: [shipD ? shipD.telephone : "", Validators.required],
      zip: [shipD ? shipD.zip : "", Validators.required],
      province: [shipD ? shipD.province : "", Validators.required],
      city: [shipD ? shipD.city : "", Validators.required],
      country: [shipD ? shipD.country : null, Validators.required],
    });
  }

  async openShippingDestinationModal(shippingDestination?: AbstractControl) {
    const modal = await this.modalController.create({
      component: AddEditShippingDestinationComponent,
      componentProps: {
        shippingDestination: shippingDestination?.value,
        countryList: this.countryList,
      },
    });

    modal.onDidDismiss().then((resp) => {
      if (resp && resp.data) {
        if (shippingDestination) {
          shippingDestination.patchValue(resp.data);
        } else {
          let shipD = this.createShippingDestinationForm(resp.data);
          this.shippingDestinationList.push(shipD);
        }
      }
    });

    await modal.present();
  }

  get shippingDestinationList() {
    return this.productForm.get("shippingDestinationList") as FormArray;
  }


  /*
    deleteShippingDestination(shipD:AbstractControl,index){
    this.shippingDestinationList.removeAt(index);
    this.addCompanyForm.updateValueAndValidity();
  }
  */
}
