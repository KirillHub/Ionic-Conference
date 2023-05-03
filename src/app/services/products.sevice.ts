import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, catchError, throwError } from "rxjs";
import { Product } from "../interfaces/products";
import { UserData, UserResult } from "../interfaces/user-profile";
import { apiLinks } from "../shared/utils/constants/apiLinks";
import { ErrorService } from "./error.service";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  public apiUrl = apiLinks.productApi;
  productsCount = 10;

  headers = new HttpHeaders({
    "Content-Type": "application/json",
  });

  constructor(private http: HttpClient, private errorService: ErrorService) {}

  getProducts(): Observable<Product[]> {
    const url = `${this.apiUrl}`;

    return (
      this.http
        .get<Product[]>(url, {
          headers: this.headers,
          params: new HttpParams().append("limit", this.productsCount),
        })
        /*
  implement some logic:
      .pipe(
        map((d) => {
          console.log(d);
          return d;
        })
      )
 */
        .pipe(
          catchError((error: unknown) => {
            this.errorService.handle(error);
            return throwError(() => error);
          })
        )
    );
  }
}
