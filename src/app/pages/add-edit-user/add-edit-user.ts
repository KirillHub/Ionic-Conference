import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "add-edit-user",
  templateUrl: "add-edit-user.html",
  styleUrls: ["./add-edit-user.scss"],
})
export class AddEditUserPage implements OnInit {
  // page route
  isAddUserRoute = false;
  isEditUserRoute = false;

  constructor(private route: ActivatedRoute) {} //  private userService:

  ngOnInit(): void {
    // const userId = this.;
  }
}
