import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ResetpasswordService } from './resetpassword.service';
import { Router } from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  RequestResetForm : FormGroup;
  forbiddenEmails : any;
  errorMessage : string;
  successMessage : any;
  isValidForm = true;

  constructor(private resetPasswordService :  ResetpasswordService, private router : Router, private notifier : NotifierService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.RequestResetForm = new FormGroup({
      'email' : new FormControl(null,[Validators.required, Validators.email])
    });
  }

  RequestResetUser(form){
    this.spinner.show();
    if(form.valid){
      this.isValidForm = true;
      this.resetPasswordService.requestReset(this.RequestResetForm.value).subscribe(
        (success)=>{
          this.RequestResetForm.reset();
          this.spinner.hide();
          this.showNotification('success', "Reset Password link sent to your email successfully!!!").then(res=>this.router.navigate(['/login']));
        },
        (error)=>{
          this.errorMessage = error.message;
        }
      )
    }
    else{
      this.isValidForm = false;
    }
  }

  showNotification(type,message){
    return new Promise((resolve,reject)=>{
      this.notifier.notify(type, message);
      setTimeout(function() {
        resolve();
      },3000);
      
    })
  }

}
