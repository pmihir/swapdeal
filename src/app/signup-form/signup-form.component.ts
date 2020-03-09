import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SignInService } from './sign-in.service';

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {
  constructor(private signInService: SignInService) {

  }

  form = new FormGroup({
    username : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  get loginControls() {
    return this.form.value;
  }
  signIn() {
    
    const signInForm = {
     email: this.loginControls.username,
      password : this.loginControls.password
    };
    this.signInService.getAuthentication(signInForm);

  }
}
