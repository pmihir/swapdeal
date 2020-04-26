import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import {SignInService} from '../app/signup-form/sign-in.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private signInService: SignInService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const accessToken = this.signInService.getAccessToken();
        req = req.clone({
            setHeaders: {
                Authorization: `JWT $[accessToken}` 
            }
        });
        return next.handle(req);
    }
}