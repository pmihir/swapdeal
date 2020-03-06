import { Injectable } from '@angular/core';
import { UriService} from '../common/uri-service.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { userInterface } from '../common/interface';


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  userMicroServiceUrl : string;

  constructor(private http : HttpClient , private uriService : UriService) { 
    this.userMicroServiceUrl = this.uriService.buildUserMicroServiceUri();
  }

  registerUser( newUser : userInterface){
    return this.http.post(this.userMicroServiceUrl + 'register', newUser) as Observable<any>;
  }
}
