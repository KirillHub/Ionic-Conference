import {
  map,
  switchMap,
  filter,
  tap,
  count,
  combineLatestAll,
} from "rxjs/operators";
import {
  AfterViewInit,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from "@angular/core";
import {
  combineLatest,
  firstValueFrom,
  Observable,
  of,
  pipe,
  concat,
  Subscription,
  Subject,
} from "rxjs";
import { UserService } from "../../services/user.service";
import { UserResult } from "../../interfaces/user-profile";
import { ionicColors } from "../../shared/utils/constants/constants";
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
export class UsersPage implements OnInit, OnDestroy {
  private destroyed = new Subject<any>();

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

  @HostListener("window:beforeunload", ["$event"])
  ngOnDestroy(): void {
    this.destroyed.next(null);
    this.destroyed.complete();
  }

  ngOnInit() {
    this.setAndLoadUserData().subscribe();
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
        }))
      ),
      switchMap((data: UserResult[]) => this.userDataService.setUsersData(data))
    );
  }

  loadUserDataFromStorage() {
    return this.userDataService.getUsersData().pipe(
      tap((userData: UserResult[]) =>
        userData.forEach(
          (mergedUserData: UserResult) =>
            (mergedUserData.isOpenMoreUserInfo = false)
        )
      ),
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
      await this.removeUserFromStorage(userId);

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

  async removeUserFromStorage(userId: number) {
    this.userDataService.removeUserById(userId).subscribe();
  }

  onRefreshClick() {
    return this.setAndLoadUserData().subscribe();
  }

  onToggleMoreInfo(event: Event, userId: number) {
    this.preventDefaultSettings(event);
    this.combinedUserData[userId].isOpenMoreUserInfo =
      !this.combinedUserData[userId].isOpenMoreUserInfo;
  }
}
