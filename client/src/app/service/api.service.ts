import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  baseUri: string = "http://localhost:4000/api";
  productUri: string = "http://localhost:4000/product";
  headers = new HttpHeaders()
    .set("Content-Type", "application/json")
    .set("Authorization", localStorage.getItem("token"));

  constructor(private http: HttpClient) {}

  // Create User
  createEmployee(data): Observable<any> {
    let url = `${this.baseUri}/create`;
    return this.http.post(url, data).pipe(catchError(this.errorMgmt));
  }

  // Create Product
  createProduct(data): Observable<any> {
    let url = `${this.productUri}/create`;
    return this.http
      .post(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  // Get All Products
  getProducts() {
    return this.http.get(`${this.productUri}`, { headers: this.headers });
  }

  // Get One Product
  getProduct(id) {
    let url = `${this.productUri}/${id}`;
    return this.http.get(url, { headers: this.headers }).toPromise();
  }

  // Edit Product
  editProduct(id, data): Observable<any> {
    let url = `${this.productUri}/${id}`;
    return this.http.post(url, data, { headers: this.headers });
  }

  // Delete Product
  deleteProduct(id) {
    let url = `${this.productUri}/${id}`;
    return this.http.delete(url, { headers: this.headers });
  }

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
