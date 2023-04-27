import { AfterViewInit, Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";

@Component({
  selector: "back-route-btn",
  template: `<ion-button (click)="goBack()">BACK</ion-button>`,
  styleUrls: ["./back-route-btn.scss"],
})
export class BackRouteBtnComponent {
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}
