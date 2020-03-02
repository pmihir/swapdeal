import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
      this.registerForm = this.formBuilder.group({
        name: ['',Validators.required],
        email:['',[Validators.required,Validators.email]],
        phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
        password:['',Validators.required,Validators.minLength(6)],
        confirmPassword:['',Validators.required]
      })
  }

  get f(){
    return this.registerForm.controls;
  }

  onSubmit(){
    this.submitted = true;
  }
  
  // matchPassword(){
  //   if(this.registerForm.controls.password == this.registerForm.controls.confirmPassword){
  //     console.log("password match");
  //   }
  // }

}
