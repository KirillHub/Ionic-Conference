import { map } from "rxjs/operators";
import { Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import { UserService } from "../../services/user.service";
import { UserResult } from "../../interfaces/user-profile";
import { ionicColors } from "../../../shared/utils/constants";

@Component({
  selector: "user-details",
  templateUrl: "user-details.html",
  styleUrls: ["user-details.scss"],
})
export class UsersDetailsPage implements OnInit {
  isUsersLoad: boolean;
  data: Observable<UserResult[]> = of([]);
  colors = ionicColors;

  constructor(private loadUserData: UserService) {}
  ngOnInit(): void {
    console.log("w");
  }


}
