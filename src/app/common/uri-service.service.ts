import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UriService {

  userMicroServiceUri = {
    protocol : 'http',
    host : 'localhost',
    port : '3000',
  };

  buildUserMicroServiceUri(){
    return this.userMicroServiceUri.protocol +
      "://" + this.userMicroServiceUri.host +
      "//" + this.userMicroServiceUri.port;
  }

}
