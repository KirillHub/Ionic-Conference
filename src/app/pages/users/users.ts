import { map, filter } from "rxjs/operators";
import { AfterViewInit, Component, OnInit } from "@angular/core";
import { Observable, of, pipe } from "rxjs";
import { UserService } from "../../services/user.service";
import { UserResult } from "../../interfaces/user-profile";
import { ionicColors } from "../../../shared/utils/constants";
import { NavigationService } from "../../services/navigation.service";
import { UserData } from "../../providers/user-data";
import { StorageService } from "../../services/storage.service";
import { UserDataStorageService } from "../../services/userStorage.service";
import { TranslateService } from "@ngx-translate/core";
import { AlertService } from "../../services/alert.service";
import { LoaderService } from "../../services/loader.service";

@Component({
  selector: "users-data",
  templateUrl: "users.html",
  styleUrls: ["./users.scss"],
})
export class UsersPage implements OnInit, AfterViewInit {
  usersDataStream$: Observable<UserResult[]> = of([]);
  isUsersLoad: boolean;
  usersData$: Observable<UserResult[]> = of([]);
  usersData: UserResult[] = [];
  colors = ionicColors;
  navHistory: string[] = [];

  constructor(
    private loadUserData: UserService,
    private userDataService: UserDataStorageService,
    private translate: TranslateService,
    private alertService: AlertService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.setUsersDataToStorage();
    this.loadUserDataFromStorage();
  }

  ngAfterViewInit(): void {}

  async setUsersDataToStorage() {
    this.usersData$ = this.loadUserData.getUsers();
    this.usersData$.subscribe((d) => {
      this.userDataService.setUsersData(d);
    });
  }

  async loadUserDataFromStorage() {
    this.usersDataStream$ = this.userDataService.getUsersData();
  }

  async openConfirmDeleteCompanyAlert() {
    const header = this.translate.instant("delete_company");
    const message = this.translate.instant("sure_want_delete_company");
    const confirm = await this.alertService.confirmationPopup(header, message);
    return confirm ? true : false;
  }

  async onDeleteClick(event: Event, userId: number) {
    this.preventDefaultSettings(event);
    const isConfirmTrue = await this.openConfirmDeleteCompanyAlert();
    isConfirmTrue ? await this.removeUserFromStorage(userId) : undefined;
  }

  async onEditUserClick(event: Event, userId: number) {
    this.preventDefaultSettings(event);
    await this.selectedUserId(userId);
  }

  preventDefaultSettings(event: Event) {
    event.stopPropagation();
    event.preventDefault();
  }

  async selectedUserId(userId: number) {
    this.userDataService.userSelectedId.next(userId);
  }

  async removeUserFromStorage(userId: number) {
    this.usersDataStream$ = this.userDataService.removeUserById(userId);
  }

  async onRefreshClick() {
    this.usersDataStream$ = this.loadUserData.getUsers();
  }
}
