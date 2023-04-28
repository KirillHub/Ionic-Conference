import { map } from "rxjs/operators";
import { AfterViewInit, Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import { UserService } from "../../services/user.service";
import { UserResult } from "../../interfaces/user-profile";
import { ionicColors } from "../../../shared/utils/constants";
import { NavigationService } from "../../services/navigation.service";
import { UserData } from "../../providers/user-data";
import { StorageService } from "../../services/storage.service";
import { UserDataStorageService } from "../../services/userStorage.service";

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
    private userDataService: UserDataStorageService
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

  async onDeleteClick(event: Event, userId: number) {
    event.stopPropagation();
    event.preventDefault();
    console.log(userId);
    this.removeUserFromStorage(userId);
  }

  async selectedUserId(userId: number) {
    console.log(`userId ${userId}`);
    this.userDataService.userSeelectedId.next(userId);
  }

  async removeUserFromStorage(userId: number) {
    this.usersDataStream$ = this.userDataService.removeUserById(userId);
  }

  async onRefreshClick() {
    this.usersDataStream$ = this.loadUserData.getUsers();
  }
}
