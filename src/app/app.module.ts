import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import {FormGroup, FormControl} from '@angular/forms';
import { RegistrationService } from './registration/registration.service';
import { UriService } from './common/uri-service.service';
import { HttpClientModule } from '@angular/common/http';
import { LayoutComponent } from './layout/layout.component'; 

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    RegistrationService,
    UriService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
