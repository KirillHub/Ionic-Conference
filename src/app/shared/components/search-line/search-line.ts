import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { UserResult } from "../../../interfaces/user-profile";
import { setObjectKeys } from "../../utils/getObjectKeys";

@Component({
  selector: "search-line",
  templateUrl: "search-line.html",
})
export class SearchLineComponent implements OnInit {
  searchTerm: string;
  userDataKeys: string[];
   items: string[] = ['Item 1', 'Item 2', 'Item 3'];

  @Input() dataKeys: UserResult[];
  @Input() filteredKeys: string[];
  @Output() selectedValue = new EventEmitter<string>();

  constructor(private popoverController: PopoverController) {}

  ngOnInit(): void {
    this.setUserKeys();
  }

  selectItem(item: string){
    console.log(item);
    this.popoverController.dismiss(item);
  }

  setUserKeys() {
    const userKeys = setObjectKeys(this.dataKeys, this.filteredKeys);
    return (this.userDataKeys = userKeys);
  }

  selectChange(value: string) {
    this.selectedValue.emit(value);
  }
}
