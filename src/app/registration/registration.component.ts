import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { RegistrationService } from '../registration.service';
import { SignupFormComponent } from '../signup-form/signup-form.component'
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  loadSignComponent: boolean = false;

  constructor(private formBuilder: FormBuilder, private registrationService: RegistrationService, private router: Router) { }

  ngOnInit(): void {
      this.registerForm = this.formBuilder.group({
        name: ['',Validators.required],
        email:['',[Validators.required,Validators.email]],
        phoneNumber: ['', Validators.required],
        password:['',[Validators.required,Validators.minLength(6)]],
        confirmPassword:['',[Validators.required, Validators.minLength(6)]]
      })
  }

  get f(){
    return this.registerForm.controls;
  }

  onSubmit(){
    this.submitted = true;
  }

  formSubmission() {
    const regForm = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      phone: this.registerForm.value.phoneNumber,
      password: this.registerForm.value.password
    }
    this.registrationService.submitRegistration(regForm).subscribe(
      (success)=>{
        console.log('success');
      },
      (error)=>{
        console.log("in error message", error);
      }
    )
    // console.log(users);

  }

  loadSignIn() {
    this.loadSignComponent = !this.loadSignComponent;
    console.log('loadsign', this.loadSignComponent);
    this.router.navigateByUrl('/login');
  }


}

//  function matchPassword(){
//     return (this.registerForm.controls.password == this.registerForm.controls.confirmPassword)? null: new Error('Password did not match');

//   }
