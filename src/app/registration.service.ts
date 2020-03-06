import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  url = 'http://localhost:3000';
  constructor(private http: HttpClient) { }


  submitRegistration(regForm): Observable<any>{
    // const registrationForm = {
    // }
    return this.http.post(`${this.url}/customers`, regForm);
  }
}
