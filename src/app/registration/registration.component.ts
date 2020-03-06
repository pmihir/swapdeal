import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { SignupFormComponent } from '../signup-form/signup-form.component'
import { Router } from '@angular/router';
import { RegistrationService } from './registration.service';
import { userInterface } from '../common/interface';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {


  submitted = false;
  loadSignComponent: boolean = false;

  constructor(private formBuilder: FormBuilder, private registrationService : RegistrationService,
    private router: Router) { }

  ngOnInit(): void {

  }

  registerForm = this.formBuilder.group({
    name: ['',[Validators.required,Validators.pattern(/^[A-Za-z][A-Za-z]*[A-Za-z]{3,25}$/)]],
    email:['',[Validators.required,Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    password:['',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,10}$/)]],
    confirmPassword:['',Validators.required]
  },
  {
    validator: validatePassword('password', 'confirmPassword')
})

  get f(){
    return this.registerForm.controls;
  }

  register() {
    this.submitted = true;
    var userObj : userInterface = {
      name:  this.registerForm.value.name,
      email:    this.registerForm.value.email,
      phoneNumber:  this.registerForm.value.phoneNumber,
      password: this.registerForm.value.password,
    };
    this.registrationService.registerUser(userObj).subscribe(
      (success)=>{
        console.log(success);
      },
      (error)=>{
        console.log(error);
      });
  }
  loadSignIn() {
    this.router.navigateByUrl('/login');
  }
}
function validatePassword(control : any , matchingControl:any){

  return (formGroup : FormGroup) => {
    const password = formGroup.controls[control];
    const confirmPassword = formGroup.controls[matchingControl];
    console.log(password, confirmPassword);

    if(password.value != confirmPassword.value){
      confirmPassword.setErrors({ validatePassword : true});
    }
    else{
      confirmPassword.setErrors(null);
    }
  }
}

//  function matchPassword(){
//     return (this.registerForm.controls.password == this.registerForm.controls.confirmPassword)? null: new Error('Password did not match');

//   }
