import { Injectable } from "@angular/core";
import {
  catchError,
  exhaustMap,
  filter,
  map,
  switchMap,
  tap,
  toArray,
  take,
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

  setUsersData(userData: UserResult[]) {
    return this.storageReady.pipe(
      filter((ready) => ready),
      switchMap(() => from(this.storage.set(this.STORAGE_USER_KEY, userData))),
      take(1),
      catchError((error) => {
        this.errorService.handle(error);
        return throwError(() => error);
      })
    );
  }

  /*
  async addUser(userData: UserResult) {
    const usersData = (await this.storage.get(this.STORAGE_USER_KEY)) || [];
    usersData.push(userData);
    return this.storage.set(this.STORAGE_USER_KEY, usersData);
  }
 */

  addUser(userData: UserResult) {
    return this.storageReady.pipe(
      filter((ready) => ready),
      exhaustMap((_) =>
        from(this.storage.get(this.STORAGE_USER_KEY) || of([]))
      ),
      tap((loadedUsersData: UserResult[]) => loadedUsersData.push(userData)),
      switchMap((updatedUsers) =>
        from(this.storage.set(this.STORAGE_USER_KEY, updatedUsers))
      ),
      catchError((error) => {
        this.errorService.handle(error);
        return throwError(() => error);
      })
    );
  }

  getUsersData(): Observable<UserResult[]> {
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
        const newUsersArr = users
          .filter((user) => user.id !== userId)
          .map((user, index) => ({
            ...user,
            id: index,
          }));
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
