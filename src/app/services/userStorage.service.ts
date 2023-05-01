import { Injectable } from "@angular/core";
import {
  catchError,
  exhaustMap,
  filter,
  map,
  switchMap,
  tap,
  toArray,
} from "rxjs/operators";
import {
  Observable,
  firstValueFrom,
  of,
  Subject,
  BehaviorSubject,
  from,
  throwError,
} from "rxjs";
import { Storage } from "@ionic/storage-angular";
import { UserResult } from "../interfaces/user-profile";
import { UserService } from "./user.service";
import { ErrorService } from "./error.service";

@Injectable({
  providedIn: "root",
})
export class UserDataStorageService {
  private storageReady = new BehaviorSubject(false);
  STORAGE_USER_KEY = "usersData";
  userSelectedId: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private storage: Storage, private errorService: ErrorService) {
    this.init(); // init storage
  }

  async init() {
    console.log("UserDataStorageService is ready to use");
    this.storageReady.next(true);
  }

  async setUsersData(userData: UserResult[]) {
    await this.storage.set(this.STORAGE_USER_KEY, userData);
  }

  async addUser(userData: UserResult) {
    const usersData = (await this.storage.get(this.STORAGE_USER_KEY)) || [];
    usersData.push(userData);
    return this.storage.set(this.STORAGE_USER_KEY, usersData);
  }

  getUsersData() {
    return this.storageReady.pipe(
      filter((ready) => ready),
      exhaustMap((_) => {
        return from(this.storage.get(this.STORAGE_USER_KEY) || of([]));
      }),
      catchError((error) => {
        this.errorService.handle(error);
        return throwError(() => error);
      })
    );
  }

  getUserById(userId: number): Observable<UserResult> {
    return this.storageReady.pipe(
      filter((ready) => ready),
      switchMap((_) => {
        return from(this.storage.get(this.STORAGE_USER_KEY) || of([]));
      }),
      map((usersData: UserResult[]) => {
        const user = usersData.find((user) => user.id === userId);
        if (usersData.length === 0)
          this.errorService.handle("Users doesn't exist!");
        if (!user) this.errorService.handle("User with this ID doesn't exist");
        return user;
      }),
      catchError((error) => {
        this.errorService.handle(error);
        return throwError(() => error);
      })
    );
  }

  removeUserById(userId: number): Observable<UserResult[]> {
    console.log("in removeUserById");

    return this.storageReady.pipe(
      filter((ready) => ready),
      switchMap(() => this.storage.get(this.STORAGE_USER_KEY)),
      map((users: UserResult[]) => {
        const newUsersArr = users.filter((user) => user.id !== userId);
        return newUsersArr;
      }),
      switchMap((updatedUsers) =>
        from(this.storage.set(this.STORAGE_USER_KEY, updatedUsers))
      ),
      catchError((error) => {
        this.errorService.handle(error);
        return throwError(() => error);
      })
    );
  }
}
