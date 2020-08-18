import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AddToCartService {
  constructor(private http: HttpClient) {}

  addToCartProduct(data: Object, userId: string): Observable<any> {
    console.log(data, userId);
    let cartObj = { productData: data, userId: userId };
    return this.http.post(
      "http://localhost:3000/cartRouter/addToCart",
      cartObj
    );
  }
}
