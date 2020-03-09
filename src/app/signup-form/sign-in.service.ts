import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UriService } from '../common/uri-service.service';


@Injectable({
  providedIn: 'root'
})
export class SignInService {

  constructor(private http: HttpClient, private uriService: UriService) { }

  getAuthentication(user) {
    console.log(user, this.uriService.buildUserMicroServiceUri() + '/auth');
    this.http.post(this.uriService.buildUserMicroServiceUri() + '/auth', user);
  }
}
