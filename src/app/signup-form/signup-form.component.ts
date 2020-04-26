import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SignInService } from './sign-in.service';
import { Router } from '@angular/router';
import { AuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import {NotifierService} from 'angular-notifier';


@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {
  loginForm: FormGroup;
  constructor(private signInService: SignInService, private fb: FormBuilder, private router: Router, private authService: AuthService, private notifier : NotifierService) {
    this.createForm();
  }
  createForm() {
    this.loginForm = this.fb.group({
      emailId: ['', Validators.required],
      password: ['', Validators.required]
    })
    return true;
  }

  public login(mode) {
    if (mode == "Local") {
      let localObject = {
        email: this.loginForm.value.emailId,
        password: this.loginForm.value.password,
        mode: 'local'
      }
      this.signInService.login(localObject).subscribe(
        (success) => {
          sessionStorage.setItem('access_token', success.token);
          sessionStorage.setItem('username', success.user.username);
          console.log(success);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          this.showNotification('warning', error.error.message);
        }
      )
    }
    if (mode == "Google") {
      let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
      this.authService.signIn(socialPlatformProvider).then(socialUser => {
        let localObject = {
          email : socialUser.email,
          firstname : socialUser.firstName,
          lastname : socialUser.lastName,
          username : socialUser.name,
          mode:'Social'
        }
        this.signInService.socialLogin(localObject).subscribe(
          (success)=>{
            sessionStorage.setItem('access_token', success.token);
            sessionStorage.setItem('username', success.user.username);
            this.router.navigate(['dashboard']);
          },
          (error)=>{
            console.log(error);  
        })
      })
    }
  }

  showNotification(type,message){
    console.log(message);
    return new Promise((resolve,reject)=>{
      this.notifier.notify(type, message);
      setTimeout(function() {
        resolve();
      },3000);
      
    })
  }
}
