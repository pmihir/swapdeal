import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductDetailService {
  constructor(private http: HttpClient) { }

  getNewProductDetail(productId): Observable<any> {
    console.log(productId);
    return this.http.get("http://localhost:3000/product/productDetails/", {
      params: { productId: productId },
    });
  }

  getProductBySearch(searchKey: string): Observable<any> {
    return this.http.get("http://localhost:3000/product/search/", {
      params: { data: searchKey },
    });
  }
}
