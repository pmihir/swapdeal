import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import {FormGroup, FormControl} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { RegistrationService } from './registration/registration.service';
import { UriService } from './common/uri-service.service';
import { LayoutComponent } from './layout/layout.component';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {SidebarModule} from 'primeng/sidebar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LayoutComponent,
    SignupFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ScrollPanelModule,
    SidebarModule,
    BrowserAnimationsModule
  ],
  providers: [
    RegistrationService,
    UriService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
