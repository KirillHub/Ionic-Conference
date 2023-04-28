import { map } from "rxjs/operators";
import { Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import { UserService } from "../../services/user.service";
import { UserResult } from "../../interfaces/user-profile";
import { ionicColors } from "../../../shared/utils/constants";
import { UserDataStorageService } from "../../services/userStorage.service";

@Component({
  selector: "user-details",
  templateUrl: "user-details.html",
  styleUrls: ["user-details.scss"],
})
export class UsersDetailsPage implements OnInit {
  isUsersLoad: boolean;
  userData: any;
  data: Observable<UserResult[]> = of([]);
  picture: string;
  colors = ionicColors;
  userId: number;

  constructor(private userDataService: UserDataStorageService) {}

  ngOnInit(): void {
    // this.getUserById();
  }

  async ionViewWillEnter() {
    console.log("We in user-details");
    this.userDataService.userSeelectedId.subscribe((userId) => {
      this.userId = userId;
    });

    this.userDataService.getUserById(this.userId).subscribe((data) => {
      this.userData = data;
    });
  }

  async getUserById() {
    // console.log("We in user-details");
    // this.userDataService.userSeelectedId.subscribe((userId) => {
    //   this.userId = userId;
    // });
    // console.log(this.userId);
    // this.userData = await this.userDataService.getUserById(this.userId);
    // this.picture = this.userData.picture.large;
    // console.log(this.userData.picture.large);
    // console.log(this.userId);
    // let a = await this.userDataService.getUserById(userId);
    // console.log(a);
  }
}
