import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UriService } from '../../common/uri-service.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SignInService {

  headers = new HttpHeaders().set('Content-type','application/json');

  constructor(private http: HttpClient, private uriService: UriService) { }

  login(user:any){
    console.log(user);
    return this.http.post("http://localhost:3000/user/login", user) as Observable<any>;
  }

  socialLogin(user:any){
    console.log(user);
    return this.http.post("http://localhost:3000/user/socialLogin", user) as Observable<any>;
  }

  getAccessToken(){
    return sessionStorage.getItem('access_token');
  }

  isLoggedIn() : boolean{
    let authToken = sessionStorage.getItem('access_token');
    return (authToken!=null) ? true : false;
  }

  logout(){
    if(sessionStorage.removeItem('access_token') == null){
      console.log("logout");
    }
  }
}
