import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetpasswordService {

  constructor(private http: HttpClient) {   }

  requestReset(body) : Observable<any>{
    console.log(body);
    return this.http.post("http://localhost:3000/user/req-reset-password", body);
  }
}
