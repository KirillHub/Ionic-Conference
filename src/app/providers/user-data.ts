import { map, switchMap } from "rxjs/operators";
import { Observable, firstValueFrom } from "rxjs";
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage-angular";
import { UserResult } from "../interfaces/user-profile";

@Injectable({
  providedIn: "root",
})
export class UserData {
  favorites: string[] = [];
  HAS_LOGGED_IN = "hasLoggedIn";
  HAS_SEEN_TUTORIAL = "hasSeenTutorial";

  constructor(public storage: Storage) {}

  hasFavorite(sessionName: string): boolean {
    return this.favorites.indexOf(sessionName) > -1;
  }

  addFavorite(sessionName: string): void {
    this.favorites.push(sessionName);
  }

  removeFavorite(sessionName: string): void {
    const index = this.favorites.indexOf(sessionName);
    if (index > -1) {
      this.favorites.splice(index, 1);
    }
  }

  async login(username: string): Promise<any> {
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      this.setUsername(username);
      return window.dispatchEvent(new CustomEvent("user:login"));
    });
  }

  async signup(username: string): Promise<any> {
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      this.setUsername(username);
      return window.dispatchEvent(new CustomEvent("user:signup"));
    });
  }

  async logout(): Promise<any> {
    return this.storage
      .remove(this.HAS_LOGGED_IN)
      .then(() => {
        return this.storage.remove("username");
      })
      .then(() => {
        window.dispatchEvent(new CustomEvent("user:logout"));
      });
  }

  setUsername(username: string): Promise<any> {
    return this.storage.set("username", username);
  }

  async setUsersData(userData$: Observable<UserResult[]>): Promise<any[]> {
    const usersDt = await firstValueFrom(userData$);
    this.storage.set("usersData", { hellow: 123444 });
    return usersDt;
    /*
    return (
      userData
        .pipe(
          map((data) => JSON.stringify(data)),
          switchMap((serializedData) =>
            this.storage.set("user_data", serializedData)
          )
        )
        // .firstValueFrom();

    );
   */
  }

  async getUsername(): Promise<string> {
    const value = await this.storage.get("username");
    return value;
  }

  async isLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  }

  async checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  }
}
