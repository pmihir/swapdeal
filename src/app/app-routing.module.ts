import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RegistrationComponent } from "./authentication/registration/registration.component";
import { SignupFormComponent } from "./authentication/signup-form/signup-form.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ResetpasswordComponent } from "./authentication/resetpassword/resetpassword.component";
import { ResponseResetPasswordComponent } from "./authentication/response-reset-password/response-reset-password.component";
import { AuthGuard } from "./auth.guard";
import { StoreComponent } from "./store/store.component";
import { ProductDetailsComponent } from "./product-details/product-details.component";
import { SearchProductsComponent } from './search-products/search-products.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  { path: "", component: DashboardComponent },
  { path: "store/:category", component: StoreComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "searchProducts/:searchKey", component: SearchProductsComponent },
  { path: "product-details/:productId", component: ProductDetailsComponent },
  { path: "cart", component: CartComponent },
  {
    path: "authentication",
    loadChildren: () =>
      import("./authentication/authentication.module").then(
        (mod) => mod.AuthenticationModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
