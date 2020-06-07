import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RegistrationComponent } from './registration/registration.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { ResponseResetPasswordComponent } from './response-reset-password/response-reset-password.component';
import { NotifierModule, NotifierOptions } from 'angular-notifier';

const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			position: 'right',
			distance: 12
		},
		vertical: {
			position: 'top',
			distance: 12,
			gap: 10
		}
	},
  theme: 'material',
  behaviour: {
    autoHide: 3000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};


@NgModule({
  declarations: [ResetpasswordComponent,RegistrationComponent,
    SignupFormComponent,
    ResponseResetPasswordComponent,],
  imports: [
    ReactiveFormsModule,
    ReactiveFormsModule,
    CommonModule,
    AuthenticationRoutingModule,
    NgxSpinnerModule,
    NotifierModule.withConfig(customNotifierOptions)
  ]
})
export class AuthenticationModule { }
