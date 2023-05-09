import { map, filter, takeUntil, tap, switchMap } from "rxjs/operators";
import { Observable, of, pipe, Subject } from "rxjs";
import { Component, HostListener, OnDestroy, OnInit } from "@angular/core";

import { Product, ProductCategory } from "../../interfaces/products";
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
import { PRODUCT_CATEGORIES } from "../../shared/utils/constants/constants";
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterEvent,
} from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "products",
  templateUrl: "products.html",
  styleUrls: ["./products.scss"],
})
export class ProductsPage implements OnInit {
  //navigation variables
  public destroyed$ = new Subject<any>();
  countryList: any[];
  // model variables
  productInfo: Product;
  sectorId: number;
  productId: number;
  products$: Observable<Product[]> = of([]);
  productsData: Product[]; //TODO custom Product[]
  memoProductsData: Product[]; //TODO custom Product[]
  productForm: FormGroup;
  productCategoryList: ProductCategory[] = PRODUCT_CATEGORIES;
  filteredProductKeys = ["id", "title", "rating", "id"];

  // loading variables
  isLoadingPage: boolean;
  openAddEditProductForm = false;
  isEditProduct = false;
  isAddProduct = false;

  // pagination variables
  skeletons_2: any[];
  skeletons_3: any[];
  page_2 = 1;
  totalItems_2 = 0;
  itemsPerPage_2 = 10;
  pageSizes = [5, 10, 15, 20, 25, 50, 100];
  page_categories = 1;
  page_categories_select_product = 1;

  // Form variable
  addProductForm: FormGroup;
  validations: any;

  constructor(
    private products: ProductsService,
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private router: Router
  ) {}

  @HostListener("window:beforeunload", ["$event"])
  ngOnDestroy(): void {
    this.destroyed$.next(null);
    this.destroyed$.complete();
  }

  ngOnInit() {
    this.sectorId = Number(this.route.snapshot.paramMap.get("sectorId"));
    this.productId = Number(this.route.snapshot.paramMap.get("productId"));
    this.initializeForm();
    this.router.events
      .pipe(
        filter((event: RouterEvent) => event instanceof NavigationEnd),
        takeUntil(this.destroyed$)
      )
      .subscribe(() => {
        this.loadData();
      });
  }

  loadData() {
    return this.products
      .getProducts(20)
      .pipe(
        map((product) => {
          return product.map((prod) => {
            const discount = +(Math.random() * 0.29 + 0.1).toFixed(2);
            const compareProductsData = {
              ...prod,
              percentSale: discount,
              salePrice: prod.price - prod.price * discount,
            };
            console.log(compareProductsData);
            return compareProductsData;
          });
        }),
        switchMap(
          (product) => (this.productsData = this.memoProductsData = product)
        ),
        takeUntil(this.destroyed$)
      )
      .subscribe();
    // this.products$ = this.products.getProducts(20);
    // this.products$.subscribe((p) => console.log(p));
  }

  onToggleProps(isToggle: boolean, isAddEditProduct?: boolean) {
    this.openAddEditProductForm = isToggle;
    // if isAddEditProduct === true - edit , else - add
    // isAddEditProduct ? (this.isEditProduct = true) : (this.isAddProduct = true);
  }

  initializeForm() {
    this.addProductForm = this.formBuilder.group({
      productId: "",
      name: ["", Validators.required],
      productCode: ["", Validators.required],
      rowNumber: [null, Validators.required],
      productCategory: ["", Validators.required],
      price: [null, Validators.required], //retailPrise
      enableExport: true,
      digital: false,
      companyCategoryPriceList: this.formBuilder.array([]),
      bundleProductsList: this.formBuilder.array([]),
      /*
      productCodeList: this.formBuilder.array([],
        Validators.compose([
          this.atLeastOneProductCodeRequired(1),
          this.atLeastOnePoductCodeSelected(1),
          this.maxOneProductCodeSelected(1),
        ])
        ),
   */
    });

    this.validations = {
      name: [
        {
          type: "required",
          message: this.translate.instant("product_name_missed_error"),
        },
      ],
      productCode: [
        {
          type: "required",
          message: this.translate.instant("product_code_missed_error"),
        },
      ],
      rowNumber: [
        {
          type: "required",
          message: this.translate.instant("row_number_missed_error"),
        },
      ],
      company_category_prices: [
        {
          type: "requireSectorToBeChecked",
          message: this.translate.instant("payment_missed_error"),
        },
      ],
      productCategory: [
        {
          type: "required",
          message: this.translate.instant("product_category_missed_error"),
        },
      ],
      percent_sale: [
        {
          type: "required",
          message: this.translate.instant("percent_sale_missed_error"),
        },
      ],
      sale_price: [
        {
          type: "required",
          message: this.translate.instant("sale_price_missed_error"),
        },
      ],
      category_price: [
        {
          type: "requireCategoryPrice",
          message: this.translate.instant("category_price_missed_error"),
        },
        {
          type: "categoryPriceMinValueError",
          message: this.translate.instant("category_price_min_value_error"),
        },
      ],
      bundleProductsList: [
        {
          type: "requireAtLeastOneProduct",
          message: this.translate.instant("select_product_missed_error"),
        },
      ],
    };
  }

  getProductsFromService() {}

  onProductCategorySelected(event: any) {
    const selectedProductCategory = event.value.productCategory;
    return this.products
      .getProductsByCategory(selectedProductCategory, 30)
      .pipe(
        switchMap(
          (product) => (this.productsData = this.memoProductsData = product)
        ),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }

  inputOnChange(event: any) {
    this.productsData = [...this.memoProductsData];

    const value = event.target.value.toLowerCase();

    if (value) {
      this.productsData = this.productsData.filter((user) =>
        Object.values(user).some((val) =>
          val.toString().toLowerCase().includes(value)
        )
      );
    }
  }

  /*
    createShippingDestinationForm(
    shipD?: Partial<ShippingDestination>
  ): AbstractControl {
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
  */

  /*

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
 */

  /*
    deleteShippingDestination(shipD:AbstractControl,index){
    this.shippingDestinationList.removeAt(index);
    this.addCompanyForm.updateValueAndValidity();
  }
  */
}
