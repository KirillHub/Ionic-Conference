import { IonicSelectableComponent } from "ionic-selectable";
import { Filters } from "./Filters";

export class FilterFormValidators {
  min?: number;
  max?: number;
  required?: boolean;
  requiredTrue?: boolean;
  email?: boolean;
  minLength?: boolean;
  maxLength?: boolean;
  pattern?: string;
  nullValidator?: boolean;
}

export class FilterFormControlOptions {
  min?: string;
  max?: string;
  step?: string;
  icon?: string;
  startDateName?: string;
  endDateName?: string;
  selectOptions?: FilterFormControlSelectOptions;
}

export class FilterFormControlSelectOptions {
  getSelectItems?: (text: string, page: number, itemsPerPage: number) => any;
  page?: number;
  itemsPerPage?: number;
  displayProperty?: string;
  isMultiple?: boolean;
  itemValueField?: string;
}

export class FilterFormControls {
  name: string;
  label?: string;
  value: any;
  placeHolder?: string;
  size?: number;
  type: string;
  disabled: boolean;
  selectItems?: any[];
  options?: FilterFormControlOptions;
  required?: boolean;
  validators?: FilterFormValidators;
}

export class FilterFormData {
  searchControl: FilterFormControls;
  filterControls: FilterFormControls[];
  static values(data: FilterFormData): Filters {
    let val = new Filters();
    val.searchValue = data.searchControl ? data.searchControl.value : "";
    data.filterControls.forEach((contr) => {
      val[contr.name] = contr.value;
    });

    return val;
  }
}
