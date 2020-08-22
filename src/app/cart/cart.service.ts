import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CartService {
  constructor(private http: HttpClient) {}

  changeQty(updatedData: any): Observable<any> {
    console.log(updatedData);
    return this.http.post(
      "http://localhost:3000/cartRouter/changeQty",
      updatedData
    );
  }

  removeProduct(productData: any): Observable<any> {
    console.log(productData);
    return this.http.post(
      "http://localhost:3000/cartRouter/removeProduct",
      productData
    );
  }

  // addToCartProduct(data: Object, userId: string): Observable<any> {
  //   console.log(data, userId);
  //   let cartObj = { productData: data, userId: userId };
  //   return this.http.post(
  //     "http://localhost:3000/cartRouter/addToCart",
  //     cartObj
  //   );
  // }
}
