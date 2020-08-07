import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) { }

  getElectronicsCollection(category: string): Observable<any> {
    return this.http.get("http://localhost:3000/productStore/searchCategory", {
      params: { category: category },
    });
  }
}


