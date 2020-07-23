import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ResponseResetServiceService } from "../Services/response-reset-service.service";
import { Router, ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { NotifierService } from "angular-notifier";

@Component({
  selector: "app-response-reset-password",
  templateUrl: "./response-reset-password.component.html",
  styleUrls: ["./response-reset-password.component.css"],
})
export class ResponseResetPasswordComponent implements OnInit {
  ResponseResetForm: FormGroup;
  errorMessage: string;
  successMessage: string;
  resetToken: null;
  CurrentState: any;
  IsResetFormValid = true;
  tokenError: String;

  constructor(
    private responseResetService: ResponseResetServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private notifier: NotifierService,
    private spinner: NgxSpinnerService
  ) {
    this.CurrentState = "wait";
    this.route.params.subscribe((params) => {
      this.resetToken = params.token;
      this.VerifyToken();
    });
  }

  ngOnInit(): void {
    this.Init();
  }

  VerifyToken() {
    this.responseResetService
      .ValidPasswordToken({ resetToken: this.resetToken })
      .subscribe(
        (success) => {
          console.log(success);
          this.CurrentState = "Verified";
        },
        (err) => {
          this.CurrentState = "NotVerfied";
          this.tokenError = err.error.message;
        }
      );
  }

  Init() {
    this.ResponseResetForm = this.fb.group({
      resetToken: [this.resetToken],
      newPassword: ["", [Validators.required, Validators.minLength(4)]],
      confirmPassword: ["", [Validators.required, Validators.minLength(4)]],
    });
  }

  Validate(passwordFormGroup: FormGroup) {
    const new_password = passwordFormGroup.controls.newPassword.value;
    const confirm_password = passwordFormGroup.controls.confirmPassword.value;

    if (confirm_password.length <= 0) {
      return null;
    }

    if (confirm_password !== new_password) {
      return {
        doesNotMatch: true,
      };
    }

    return null;
  }

  ResetPassword(form) {
    this.spinner.show();
    this.IsResetFormValid = true;
    this.responseResetService
      .newPassword(this.ResponseResetForm.value)
      .subscribe(
        (success) => {
          this.ResponseResetForm.reset();
          this.spinner.hide();
          this.showNotification(
            "success",
            "Password reset successfully!!!"
          ).then((res) => this.router.navigate(["/login"]));
        },
        (error) => {
          this.errorMessage = error.error.message;
        }
      );
  }

  showNotification(type, message) {
    return new Promise((resolve, reject) => {
      this.notifier.notify(type, message);
      setTimeout(function () {
        resolve();
      }, 3000);
    });
  }
}
