import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { Country } from "../../../models-entity/Country";
import { AlertService } from "../../../services/alert.service";

@Component({
  selector: "app-add-edit-shipping-destination",
  templateUrl: "./add-edit-shipping-destination.component.html",
  styleUrls: ["./add-edit-shipping-destination.component.scss"],
})
export class AddEditShippingDestinationComponent implements OnInit {
  @Input() shippingDestination;
  countryList: Country[] = [];
  @Input() companyPage;

  // utils variables
  shippingForm: FormGroup;
  validations: any;
  ChangeContent: boolean;

  // loading variables;
  isLoadingPage: boolean;
  mobileMode: boolean;
  formBakcup: string;
  shippingId: number;
  saved: any;

  constructor(
    private modalController: ModalController,
    private translate: TranslateService,
    private alertService: AlertService,
    private formBuilder: FormBuilder // private fixedTypologies: FixedTypologiesService //TODO - add country api
  ) {}

  ngOnInit() {
    this.HideContent();
    console.log("companyPage value :", this.companyPage);
    this.initializeForm();
    this.patchFormValues();
  }

  initializeForm() {
    this.shippingForm = this.formBuilder.group({
      name: ["", Validators.required],
      telephone: ["", Validators.required],
      attention: "",
      zip: ["", Validators.required],
      city: ["", Validators.required],
      address: ["", Validators.required],
      country: [null, Validators.required],
      province: "",
    });

    this.validations = {
      name: [
        {
          type: "required",
          message: this.translate.instant("name_missed_error"),
        },
      ],
      address: [
        {
          type: "required",
          message: this.translate.instant("address_missed_error"),
        },
      ],
      zip: [
        {
          type: "required",
          message: this.translate.instant("zip_missed_error"),
        },
      ],
      city: [
        {
          type: "required",
          message: this.translate.instant("city_missed_error"),
        },
      ],
      state: [
        {
          type: "required",
          message: this.translate.instant("state_missed_error"),
        },
      ],
      telephone: [
        {
          type: "required",
          message: this.translate.instant("telephone_missed_error"),
        },
      ],
    };
  }

  validateFormAndSave() {
    if (this.shippingForm.invalid) {
      this.alertService.formValidationError();
      this.shippingForm.updateValueAndValidity();
    } else {
      this.modalController.dismiss(this.shippingForm.value);
    }
    console.log(this.shippingForm.value);
  }

  patchFormValues() {
    if (this.shippingDestination) {
      this.shippingForm.patchValue(this.shippingDestination);
    }
    console.log(this.shippingForm.value);
  }

  backupFormData() {
    this.formBakcup = JSON.stringify(this.shippingForm.getRawValue());
  }

  async modalDismiss() {
    this.modalController.dismiss();

    console.log(this.shippingForm.value);
  }

  HideContent() {
    if (this.companyPage) {
      this.ChangeContent = true;
    } else {
      this.ChangeContent = false;
    }
  }

  loadCountries(event: Event) {
    if (this.countryList.length == 0) {
      this.getCountries(event);
    }
  }

  getCountries(event: Event) {
    /*
      event.component.startSearch();
    this.fixedTypologies.getFixedTypologies("country").then(
      async (response) => {
        this.countryList = response.type_list;
        event.component.endSearch();
      },
      async (error) => {
        event.component.endSearch();
        (await this.alertService.apiError(error.errorCode)).present();
      }
    );
    */
  }
}
