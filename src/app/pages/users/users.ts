import { map } from "rxjs/operators";
import { Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import { UserService } from "../../services/user.service";
import { UserResult } from "../../interfaces/user-profile";
import { ionicColors } from "../../../shared/utils/constants";

@Component({
  selector: "users-data",
  templateUrl: "users.html",
  styleUrls: ["./users.scss"],
})
export class UsersPage implements OnInit {
  isUsersLoad: boolean;
  data: Observable<UserResult[]> = of([]);
  colors = ionicColors;

  constructor(private loadUserData: UserService) {}
  ngOnInit(): void {
    this.loadUserData.getUsers().subscribe((d) => this.enrollUsers(d));
    // .pipe(map((data) => console.log(data)));
  }

  async enrollUsers(data: UserResult[]) {
    console.log(data);
    data.length !== 0 ? (this.isUsersLoad = true) : undefined;
    this.data = of(data);
    // console.log(this.data);
  }
}
