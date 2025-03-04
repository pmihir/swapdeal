import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http : HttpClient) { }

  getNewProductData() : Observable<any>{
    return this.http.get("http://localhost:3000/product/get-new-product");
  }
}
