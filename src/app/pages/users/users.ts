import { map } from "rxjs/operators";
import { AfterViewInit, Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import { UserService } from "../../services/user.service";
import { UserResult } from "../../interfaces/user-profile";
import { ionicColors } from "../../../shared/utils/constants";
import { NavigationService } from "../../services/navigation.service";
import { UserData } from "../../providers/user-data";
import { StorageService } from "../../services/storage.service";

@Component({
  selector: "users-data",
  templateUrl: "users.html",
  styleUrls: ["./users.scss"],
})
export class UsersPage implements OnInit {
  isUsersLoad: boolean;
  usersData: Observable<UserResult[]> = of([]);
  colors = ionicColors;
  navHistory: string[] = [];
  _testData = {
    test: "test",
  };

  constructor(
    private loadUserData: UserService,
    private userProvider: UserData,
    private testStorage: StorageService
  ) {}

  ngOnInit(): void {
    this.loadUserData.getUsers().subscribe((d) => this.enrollUsers(d));

    this.testStorage.init();
    this.testStorage.set("testData", this._testData);
    // .pipe(map((data) => console.log(data)));
  }

  async setUserData() {
    await this.userProvider.setUsersData(this.usersData);
  }

  async enrollUsers(data: UserResult[]) {
    data.length !== 0 ? (this.isUsersLoad = true) : undefined;
    this.usersData = of(data);
    // console.log(this.data);
  }

  getTestStoreData() {
    console.log(this.testStorage.get("testData"));
    // console.log(this.navigation);
  }
}
