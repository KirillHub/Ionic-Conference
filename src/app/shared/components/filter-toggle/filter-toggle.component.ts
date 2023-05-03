import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { ModalController, Platform } from "@ionic/angular";
import { BehaviorSubject } from "rxjs";
import {
  FilterFormControls,
  FilterFormData,
} from "../../../models-entity/FilterFormData";
import { SearchFiltersComponent } from "../search-filters/search-filters.component";

@Component({
  selector: "app-filter-toggle",
  templateUrl: "./filter-toggle.component.html",
  styleUrls: ["./filter-toggle.component.scss"],
})
export class FilterToggleComponent implements OnInit {
  //in out variables
  @Input() set filters(value: FilterFormData) {
    this._filters = value;
    this.modalFilters.next(value.filterControls);
  }
  _filters: FilterFormData;

  @Output() filtersChange = new EventEmitter<FilterFormData>();
  mobileMode: boolean;

  modalFilters = new BehaviorSubject<FilterFormControls[]>([]);
  modalFilterChange = new EventEmitter<FilterFormControls[]>();

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  async openFilterModal() {
    const modal = await this.modalController.create({
      component: SearchFiltersComponent,
      componentProps: {
        modalFilterChange: this.modalFilterChange,
        modalFilters: this.modalFilters,
        inModal: true,
      },
      backdropDismiss: true,
      showBackdrop: true,
      cssClass: "modal-filters",
    });
    await modal.present();

    this.modalFilterChange.subscribe((filters) => {
      this.changeFilter(filters);
    });
  }

  changeFilter(event) {
    this._filters.filterControls = event;
    this.filtersChange.emit(this._filters);
  }

  changeSearch() {
    this.filtersChange.emit(this._filters);
  }
}
