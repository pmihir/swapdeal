import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UriService {

  userMicroServiceUri = {
    protocol : 'http',
    host : 'localhost',
    port : '3000',
    applicationName : 'user'
  };

  buildUserMicroServiceUri(){
    return this.userMicroServiceUri.protocol +
      "://" + this.userMicroServiceUri.host +
      "//" + this.userMicroServiceUri.port + 
      "/" + this.userMicroServiceUri.applicationName + "/" 
  }

}
