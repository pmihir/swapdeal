import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SignupFormComponent } from "../signup-form/signup-form.component";
import { Router, Routes } from "@angular/router";
import { RegistrationService } from "../Services/registration.service";
import { userInterface } from "../../common/interface";
import { NgxSpinnerService } from "ngx-spinner";
import { NotifierService } from "angular-notifier";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"],
})
export class RegistrationComponent implements OnInit {
  submitted = false;
  loadSignComponent: boolean = false;
  showMessage: boolean = false;
  successMessage: String = null;
  errorMessage: String = null;

  constructor(
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService,
    private router: Router,
    private notifier: NotifierService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  registerForm = this.formBuilder.group(
    {
      firstName: "",
      lastName: "",
      userName: [
        "",
        [
          Validators.required,
          Validators.pattern(/^[A-Za-z][A-Za-z]*[A-Za-z]{3,25}$/),
        ],
      ],
      email: ["", [Validators.required, Validators.email]],
      phoneNumber: [
        "",
        [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
      ],
      password: [
        "",
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,10}$/
          ),
        ],
      ],
      confirmPassword: ["", Validators.required],
    },
    {
      validator: validatePassword("password", "confirmPassword"),
    }
  );

  get f() {
    return this.registerForm.controls;
  }

  register() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.spinner.show();

    var userObj: userInterface = {
      firstname: this.registerForm.value.firstName,
      lastname: this.registerForm.value.lastName,
      username: this.registerForm.value.userName,
      email: this.registerForm.value.email,
      phonenumber: this.registerForm.value.phoneNumber,
      password: this.registerForm.value.password,
    };

    this.registrationService.registerUser(userObj).subscribe(
      (success) => {
        console.log(success);
        this.spinner.hide();
        this.successMessage = success.message;
        this.submitted = false;
        this.registerForm.reset();
        this.showNotification(
          "success",
          "User is successfully Registered!!!"
        ).then((res) => this.router.navigate(["/login"]));
      },
      (error) => {
        console.log(error);
        this.spinner.hide();
        this.showNotification("warning", error.error.message);
        this.errorMessage = error.error.message;
      }
    );
  }

  showNotification(type, message) {
    return new Promise((resolve, reject) => {
      this.notifier.notify(type, message);
      setTimeout(function () {
        resolve();
      }, 1000);
    });
  }
}
function validatePassword(control: any, matchingControl: any) {
  return (formGroup: FormGroup) => {
    const password = formGroup.controls[control];
    const confirmPassword = formGroup.controls[matchingControl];
    console.log(password, confirmPassword);

    if (password.value != confirmPassword.value) {
      confirmPassword.setErrors({ validatePassword: true });
    } else {
      confirmPassword.setErrors(null);
    }
  };
}

//  function matchPassword(){
//     return (this.registerForm.controls.password == this.registerForm.controls.confirmPassword)? null: new Error('Password did not match');

//   }
