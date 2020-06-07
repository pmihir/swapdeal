import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SignInService } from '../Services/sign-in.service';
import { Router } from '@angular/router';
import { AuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {
  loginForm: FormGroup;
  submitted: boolean = false;
  constructor(private signInService: SignInService, private fb: FormBuilder, private router: Router, private authService: AuthService, private notifier: NotifierService) {
    this.createForm();
  }
  createForm() {
    this.loginForm = this.fb.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{2,10}$/)]]
    })
    return true;
  }

  get f() {
    return this.loginForm.controls;
  }


  public login(mode) {
    if (mode == "Local") {
      this.submitted = true;
      if (!this.loginForm.invalid) {

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
    }
    else {
      let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
      this.authService.signIn(socialPlatformProvider).then(socialUser => {
        let localObject = {
          email: socialUser.email,
          firstname: socialUser.firstName,
          lastname: socialUser.lastName,
          username: socialUser.name,
          mode: 'Social'
        }
        this.signInService.socialLogin(localObject).subscribe(
          (success) => {
            sessionStorage.setItem('access_token', success.token);
            sessionStorage.setItem('username', success.user.username);
            this.router.navigate(['/dashboard']);
          },
          (error) => {
            console.log(error);
          })
      })
    }

  }

  showNotification(type, message) {
    console.log(message);
    return new Promise((resolve, reject) => {
      this.notifier.notify(type, message);
      setTimeout(function () {
        resolve();
      }, 3000);

    })
  }
}
