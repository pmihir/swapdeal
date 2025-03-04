import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { RegistrationComponent } from "./authentication/registration/registration.component";
import { FormGroup, FormControl } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { SignupFormComponent } from "./authentication/signup-form/signup-form.component";
import { RegistrationService } from "./authentication/Services/registration.service";
import { UriService } from "./common/uri-service.service";
import { LayoutComponent } from "./layout/layout.component";
import { ScrollPanelModule } from "primeng/scrollpanel";
import { SidebarModule } from "primeng/sidebar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { NotifierModule, NotifierOptions } from "angular-notifier";
import { NgxSpinnerModule } from "ngx-spinner";
import { AuthInterceptor } from "./auth.interceptor";
// import { MatStepperModule } from "@angular/material/stepper";

import {
  SocialLoginModule,
  AuthServiceConfig,
  AuthService,
} from "angularx-social-login";
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
} from "angularx-social-login";
// import { ResetpasswordComponent } from './authentication/resetpassword/resetpassword.component';
import { ResponseResetPasswordComponent } from "./authentication/response-reset-password/response-reset-password.component";
import { CarouselModule } from "primeng/carousel";
import { ButtonModule } from "primeng/button";
import { RangePipe } from "./dashboard/range.pipe";
import { FooterComponent } from "./footer/footer.component";
import { AuthenticationModule } from "./authentication/authentication.module";
import { StoreComponent } from "./store/store.component";
import { ListboxModule } from "primeng/listbox";
import { SliderModule } from "primeng/slider";
import { ProductDetailsComponent } from "./product-details/product-details.component";
import { DialogModule } from "primeng/dialog";
import { SearchProductsComponent } from "./search-products/search-products.component";
import { AutoCompleteModule } from "primeng/autocomplete";
import { CartComponent } from "./cart/cart.component";
import { InputNumberModule } from "primeng/inputnumber";
import { ButtonComponent } from "./button/button.component";
import { PricecalculationPipe } from "./cart/pricecalculation.pipe";
import { OrderDetailsComponent } from "./order-details/order-details.component";

const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: "right",
      distance: 12,
    },
    vertical: {
      position: "top",
      distance: 12,
      gap: 10,
    },
  },
  theme: "material",
  behaviour: {
    autoHide: 3000,
    onClick: "hide",
    onMouseover: "pauseAutoHide",
    showDismissButton: true,
    stacking: 4,
  },
  animations: {
    enabled: true,
    show: {
      preset: "slide",
      speed: 300,
      easing: "ease",
    },
    hide: {
      preset: "fade",
      speed: 300,
      easing: "ease",
      offset: 50,
    },
    shift: {
      speed: 300,
      easing: "ease",
    },
    overlap: 150,
  },
};

export function socialConfigs() {
  const config = new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider(
        "36129637313-7i4fm11ubsqd6pk8qhh7jv3n8cvjgl04.apps.googleusercontent.com"
      ),
    },
  ]);
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    DashboardComponent,
    RangePipe,
    FooterComponent,
    StoreComponent,
    ProductDetailsComponent,
    SearchProductsComponent,
    CartComponent,
    ButtonComponent,
    PricecalculationPipe,
    OrderDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ScrollPanelModule,
    SidebarModule,
    BrowserAnimationsModule,
    NotifierModule.withConfig(customNotifierOptions),
    NgxSpinnerModule,
    CarouselModule,
    ButtonModule,
    AuthenticationModule,
    ListboxModule,
    SliderModule,
    DialogModule,
    AutoCompleteModule,
    InputNumberModule,
  ],
  providers: [
    UriService,
    AuthInterceptor,
    AuthService,
    {
      provide: AuthServiceConfig,
      useFactory: socialConfigs,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
