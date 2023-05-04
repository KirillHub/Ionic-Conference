import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, catchError, throwError } from "rxjs";
import { UserData, UserResult } from "../interfaces/user-profile";
import { apiLinks } from "../shared/utils/constants/apiLinks";
import { ErrorService } from "./error.service";

@Injectable({
  providedIn: "root",
})
export class UserService {
  apiUrl = apiLinks.userApi;
  seed = 123;

  headers = new HttpHeaders({
    "Content-Type": "application/json",
  });

  constructor(private http: HttpClient, private errorService: ErrorService) {}

  getUsers(): Observable<UserResult[]> {
    const userCount = 10;
    const url = `${this.apiUrl}?inc=name,gender,email,phone,picture,location&noinfo&nat=us&results=${userCount}&seed=${this.seed}`;
    return this.http
      .get<UserData>(url, {
        headers: this.headers,
        params: new HttpParams().append("limit", userCount),
      })
      .pipe(
        map((data) => {
          const userData = data.results.map((user, id) => {
            const name = Object.values(user.name).join(" ");

            return { ...user, name, id };
          });
          return userData;
        })
      )
      .pipe(
        catchError((error: unknown) => {
          this.errorService.handle(error);
          return throwError(() => error);
        })
      );
  }
}
