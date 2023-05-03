import { map, filter, count, combineLatestAll } from "rxjs/operators";
import { AfterViewInit, Component, OnInit } from "@angular/core";
import { combineLatest, firstValueFrom, Observable, of, pipe } from "rxjs";
import { UserService } from "../../services/user.service";
import { UserResult } from "../../interfaces/user-profile";
import { ionicColors } from "../../../shared/utils/constants";
import { UserDataStorageService } from "../../services/userStorage.service";
import { TranslateService } from "@ngx-translate/core";
import { AlertService } from "../../services/alert.service";
import { LoaderService } from "../../services/loader.service";
import { userDescription } from "../../shared/utils/constants/userDescr";

@Component({
  selector: "users-data",
  templateUrl: "users.html",
  styleUrls: ["./users.scss"],
})
export class UsersPage implements OnInit, AfterViewInit {
  usersDataStream$: Observable<UserResult[]> = of([]);
  isUsersLoad: boolean;
  usersDataFromApiRequest$: Observable<UserResult[]> = of([]);
  usersData: UserResult[] = [];
  colors = ionicColors;
  combinedUserData: UserResult[];

  constructor(
    private loadUserData: UserService,
    private userDataService: UserDataStorageService,
    private translate: TranslateService,
    private alertService: AlertService,
    private loaderService: LoaderService
  ) {}

  async ngOnInit() {
    await this.setUsersDataToStorage();
    await this.loadUserDataFromStorage();
  }

  ngAfterViewInit(): void {}

  async getUserDataFromApiRequest() {
    this.usersDataFromApiRequest$ = this.loadUserData.getUsers();
  }

  async setUsersDataToStorage() {
    await this.getUserDataFromApiRequest();
    this.usersDataFromApiRequest$
      .pipe(
        map((data: UserResult[]) =>
          data.map((user) => ({
            ...user,
            description: userDescription,
          }))
        )
      )
      .subscribe((d) => this.userDataService.setUsersData(d));
  }

  async transformUserData() {}

  async loadUserDataFromStorage() {
    this.userDataService.getUsersData().subscribe((userData: UserResult[]) => {
      userData.map(
        (mergedUserData: UserResult) =>
          (mergedUserData.isOpenMoreUserInfo = false)
      );
      this.combinedUserData = userData;
    });
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

  onToggleMoreInfo(event: Event, userId: number) {
    this.preventDefaultSettings(event);
    this.combinedUserData[userId].isOpenMoreUserInfo =
      !this.combinedUserData[userId].isOpenMoreUserInfo;
  }
}
