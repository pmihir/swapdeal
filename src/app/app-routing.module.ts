import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ResponseResetPasswordComponent } from './response-reset-password/response-reset-password.component';


const routes: Routes = [
  {path : '', component: RegistrationComponent},
  {path : 'login', component: SignupFormComponent},
  {path : 'dashboard' ,component : DashboardComponent},
  {path : 'requestReset' , component : ResetpasswordComponent},
  {path : 'response-reset-password/:token', component : ResponseResetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
