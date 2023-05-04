import { map } from "rxjs/operators";
import { Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import { UserService } from "../../services/user.service";
import { UserResult } from "../../interfaces/user-profile";
import { ionicColors } from "../../shared/utils/constants/constants";
import { UserDataStorageService } from "../../services/userStorage.service";

@Component({
  selector: "user-details",
  templateUrl: "user-details.html",
  styleUrls: ["user-details.scss"],
})
export class UsersDetailsPage implements OnInit {
  isUsersLoad: boolean;
  userData: UserResult;
  data: Observable<UserResult[]> = of([]);
  colors = ionicColors;
  userId: number;

  constructor(private userDataService: UserDataStorageService) {}

  ngOnInit(): void {}

  async ionViewWillEnter() {
    this.userDataService.userSelectedId.subscribe((userId) => {
      this.userId = userId;
    });

    this.userDataService
      .getUserById(this.userId)
      .subscribe((data) => (this.userData = data));
  }
}
