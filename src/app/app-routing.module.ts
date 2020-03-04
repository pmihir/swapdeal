import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { SignupFormComponent } from './signup-form/signup-form.component';


const routes: Routes = [
  {path : '', component: RegistrationComponent},
  {path : 'login', component: SignupFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
