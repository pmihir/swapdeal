import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponseResetServiceService {

  constructor(private http : HttpClient) { }

  ValidPasswordToken(body) : Observable<any>{
    return this.http.post("http://localhost:3000/user/valid-password-token", body);
  }

  newPassword(body) : Observable<any>{
    console.log(body);
    return this.http.post("http://localhost:3000/user/new-password", body);
  }
}
