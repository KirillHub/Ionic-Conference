import { map, switchMap, filter, tap, takeUntil } from "rxjs/operators";
import { Component, HostListener, OnDestroy, OnInit } from "@angular/core";
import { combineLatest, Observable, of, pipe, concat, Subject } from "rxjs";
import { UserService } from "../../services/user.service";
import { UserResult } from "../../interfaces/user-profile";
import { ionicColors } from "../../shared/utils/constants/constants";
import { UserDataStorageService } from "../../services/userStorage.service";
import { TranslateService } from "@ngx-translate/core";
import { AlertService } from "../../services/alert.service";
import { LoaderService } from "../../services/loader.service";
import { userDescription } from "../../shared/utils/constants/userDescr";
import { NavigationEnd, Router } from "@angular/router";
import { isEqual } from "../../shared/utils/equal";
import { PopoverController } from "@ionic/angular";
import { SearchLineComponent } from "../../shared/components/search-line/search-line";

@Component({
  selector: "users-data",
  templateUrl: "users.html",
  styleUrls: ["./users.scss"],
})
export class UsersPage implements OnInit, OnDestroy {
  private destroyed$ = new Subject<any>();

  isUsersExtistInStorage: boolean;
  isUsersLoad: boolean;
  colors = ionicColors;
  memoUsersData: UserResult[];
  combinedUserData: UserResult[];

  filteredUserKeys = ["isOpenMoreUserInfo", "id"];
  searchTerm: string;
  selectedValue: string;
  // userKeys: UserResult[];

  constructor(
    private loadUserData: UserService,
    private userDataService: UserDataStorageService,
    private translate: TranslateService,
    private alertService: AlertService,
    private loaderService: LoaderService,
    private popoverController: PopoverController,
    private router: Router
  ) {}

  @HostListener("window:beforeunload", ["$event"])
  ngOnDestroy(): void {
    this.destroyed$.next(null);
    this.destroyed$.complete();
  }

  ngOnInit() {
    this.isUsersDataAlreadyExist();

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroyed$)
      )
      .subscribe(() => {
        this.isUsersDataAlreadyExist();
      });
  }

  /*
  setUserKeys(val: UserResult[]) {
    return (this.userKeys = Object.keys(val[0]).filter(
      (k, _) => k !== "isOpenMoreUserInfo" && k !== "id"
    ));
  }
*/

  isUsersDataAlreadyExist() {
    return combineLatest([
      this.userDataService.getUsersData(),
      of(this.combinedUserData),
    ])
      .pipe(
        map(([usersData, prevUsersData]) => {
          const isPrevUsersDataEqualWithCurrent = isEqual(
            prevUsersData,
            usersData
          );
          if (!isPrevUsersDataEqualWithCurrent) {
            this.combinedUserData = usersData;
            this.memoUsersData = this.combinedUserData; // !
            // this.setUserKeys(this.combinedUserData);
          }
          console.log(this.combinedUserData);
          return usersData;
        }),
        switchMap((usersData) => {
          if (usersData.length !== 0) {
            return of(usersData);
          } else {
            return this.setAndLoadUserData().pipe(
              tap((usersData) => (this.combinedUserData = usersData)),
              map(() => {
                console.log("HERE 2 ");
                this.memoUsersData = this.combinedUserData; // !
                // this.setUserKeys(this.combinedUserData);
                return this.combinedUserData;
              })
            );
          }
        }),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }

  getUserDataFromApiRequest() {
    return this.loadUserData.getUsers();
  }

  setUsersDataToStorage() {
    return this.getUserDataFromApiRequest().pipe(
      map((data: UserResult[]) =>
        data.map((user) => ({
          ...user,
          description: userDescription,
          isOpenMoreUserInfo: false,
        }))
      ),
      switchMap((data: UserResult[]) => this.userDataService.setUsersData(data))
    );
  }

  loadUserDataFromStorage() {
    return this.userDataService
      .getUsersData()
      .pipe(
        map((userData: UserResult[]) => (this.combinedUserData = userData))
      );
  }

  setAndLoadUserData(): Observable<UserResult[]> {
    return concat(this.setUsersDataToStorage(), this.loadUserDataFromStorage());
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
    if (isConfirmTrue) {
      this.removeUserFromStorage(userId);

      this.combinedUserData.splice(userId, 1);
      this.combinedUserData = this.combinedUserData.map((user, i) => ({
        ...user,
        id: i,
      }));
    }
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

  removeUserFromStorage(userId: number) {
    this.userDataService
      .removeUserById(userId)
      .pipe(takeUntil(this.destroyed$))
      .subscribe();
  }

  onRefreshClick() {
    this.setAndLoadUserData().pipe(takeUntil(this.destroyed$)).subscribe();
  }

  onToggleMoreInfo(event: Event, userId: number) {
    this.preventDefaultSettings(event);

    this.combinedUserData[userId].isOpenMoreUserInfo =
      !this.combinedUserData[userId].isOpenMoreUserInfo;
  }

  onSelectedValue(value: string) {
    this.selectedValue = value;
    console.log("Selected value:", value);
  }

  inputOnChange(event: any) {
    // this.memoUsersData = this.combinedUserData;
    this.combinedUserData = [...this.memoUsersData];

    const value = event.target.value.toLowerCase();

    if (value) {
      this.combinedUserData = this.combinedUserData.filter((user) =>
        Object.values(user).some((val) =>
          val.toString().toLowerCase().includes(value)
        )
      );
    }
  }

  /*
  TODO: вспомогательная строка для поиска
  async presentPopover(ev: any) {
    console.log(ev);
    const popover = await this.popoverController.create({
      component: SearchLineComponent,
      event: ev,
      translucent: true,
    });
    await popover.present();

    const { data } = await popover.onWillDismiss();
    console.log(data);
  }
*/
}
