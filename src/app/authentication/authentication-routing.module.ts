import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ResponseResetPasswordComponent } from './response-reset-password/response-reset-password.component';
import { RegistrationComponent } from './registration/registration.component';
import { SignupFormComponent } from './signup-form/signup-form.component';


const routes: Routes = [
  {path:'requestReset',component:ResetpasswordComponent},
  {path:'response-reset-password/:token', component : ResponseResetPasswordComponent},
  {path:'registration',component:RegistrationComponent},
  {path:'login',component:SignupFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
