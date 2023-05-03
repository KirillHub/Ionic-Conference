import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { input } from "@aws-amplify/ui";
import { ModalController } from "@ionic/angular";
import { BehaviorSubject, Observable } from "rxjs";
import { first } from "rxjs/operators";
import {
  FilterFormControls,
  FilterFormData,
} from "../../../models-entity/FilterFormData";
import { AlertService } from "../../../services/alert.service";

@Component({
  selector: "app-search-filters",
  templateUrl: "./search-filters.component.html",
  styleUrls: ["./search-filters.component.scss"],
})
export class SearchFiltersComponent implements OnInit, OnDestroy {
  // model
  @Input() inModal: boolean;
  myForm: FormGroup = this.fb.group({});
  _filters: BehaviorSubject<FilterFormControls[]> = new BehaviorSubject<
    FilterFormControls[]
  >([]);

  // normal In/Out
  @Input() set filters(value: FilterFormControls[]) {
    if (this.subscribedChanges) {
      this.subscribedChanges.unsubscribe();
    }
    this._filters.next(value);
    this.createForm(value);
  }

  @Output() filtersChange = new EventEmitter<FilterFormControls[]>();
  subscribedChanges: any;

  // modal In/Out
  @Input() modalFilterChange: EventEmitter<FilterFormControls[]>;
  @Input() modalFilters: BehaviorSubject<FilterFormControls[]>;
  subscribeInputFilters: any;

  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    private alertService: AlertService
  ) {}

  ngOnDestroy(): void {
    if (this.subscribedChanges) {
      this.subscribedChanges.unsubscribe();
    }

    if (this.subscribeInputFilters) {
      this.subscribeInputFilters.unsubscribe();
    }
  }
  ngOnInit(): void {
    if (this.inModal) {
      this.subscribeInputFilters = this.modalFilters.subscribe((filters) => {
        this._filters.next(filters);
        this.createForm(filters);
      });
    }
  }

  createForm(controls: FilterFormControls[]) {
    for (const control of controls) {
      const validatorsToAdd = [];
      for (const [key, value] of Object.entries(control.validators)) {
        switch (key) {
          case "min":
            validatorsToAdd.push(Validators.min(value));
            break;
          case "max":
            validatorsToAdd.push(Validators.max(value));
            break;
          case "required":
            if (value) {
              validatorsToAdd.push(Validators.required);
            }
            break;
          case "requiredTrue":
            if (value) {
              validatorsToAdd.push(Validators.requiredTrue);
            }
            break;
          case "email":
            if (value) {
              validatorsToAdd.push(Validators.email);
            }
            break;
          case "minLength":
            validatorsToAdd.push(Validators.minLength(value));
            break;
          case "maxLength":
            validatorsToAdd.push(Validators.maxLength(value));
            break;
          case "pattern":
            validatorsToAdd.push(Validators.pattern(value));
            break;
          case "nullValidator":
            if (value) {
              validatorsToAdd.push(Validators.nullValidator);
            }
            break;
          default:
            break;
        }
      }

      if (this.myForm) {
        let oldControl = this.myForm.get(control.name);
        if (oldControl) {
          oldControl.patchValue(control.value);
          oldControl.setValidators(validatorsToAdd);
          if (control.disabled) {
            oldControl.disable();
          } else {
            oldControl.enable();
          }
        } else {
          this.myForm.addControl(
            control.name,
            this.fb.control(
              { value: control.value, disabled: control.disabled },
              validatorsToAdd
            )
          );
        }
      }
    }

    this.subscribedChanges = this.myForm.valueChanges.subscribe((x) => {
      console.log("form value changed");
      console.log(x);
      this.patchFilterFormData(x);
      if (!this.inModal) {
        this.filtersChange.emit(this._filters.getValue());
      } else {
        this.modalFilterChange.emit(this._filters.getValue());
      }
    });
  }

  patchFilterFormData(formValues: any) {
    Object.keys(formValues).forEach((key) => {
      let filter = this._filters.getValue().find((el) => el.name === key);
      filter.value = formValues[key];
    });
  }

  onSubmit() {
    console.log("Form valid: ", this.myForm.valid);
    console.log("Form values: ", this.myForm.value);
  }

  closeModal() {
    this.modalController.dismiss(this._filters.getValue());
  }

  resetFilters() {
    this.myForm.reset();
  }

  getSelectData(event, control: FilterFormControls) {
    if (control?.options?.selectOptions?.getSelectItems) {
      control.options.selectOptions.page = 1;
      event.component.startSearch();
      control.options.selectOptions
        .getSelectItems(
          event.text,
          control.options.selectOptions.page,
          control.options.selectOptions.itemsPerPage
        )
        .then((items) => {
          event.component.items = items;
          event.component.enableInfiniteScroll();
          event.component.endSearch();
        });
    }
  }

  loadMoreSelectData(event, control: FilterFormControls) {
    control.options.selectOptions.page++;
    control.options.selectOptions
      .getSelectItems(
        event.text,
        control.options.selectOptions.page,
        control.options.selectOptions.itemsPerPage
      )
      .then((items) => {
        event.component.items = event.component.items.concat(items);
        event.component.endInfiniteScroll();
      });
  }

  checkGetData(event, control: FilterFormControls) {
    if (control.selectItems && control.selectItems.length == 0) {
      this.getSelectData(event, control);
    }
  }
}
