import { Component, OnInit, Input } from "@angular/core";
import { AddToCartService } from "./add-to-cart.service";
import { NotifierService } from "angular-notifier";
import { AppComponent } from "../app.component";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.css"],
})
export class ButtonComponent implements OnInit {
  @Input() productData;
  data: any;
  constructor(
    private addToCartService: AddToCartService,
    private notificationService: AppComponent,
    private notifier: NotifierService
  ) {}

  ngOnInit(): void {}

  addToCart() {
    let prodObj = {
      pName: this.productData.name,
      pId: this.productData.productId,
      price: this.productData.discountPrice,
      brand: this.productData.brand,
      image: this.productData.image,
    };
    let userData = JSON.parse(sessionStorage.getItem("user"));
    this.addToCartService.addToCartProduct(prodObj, userData._id).subscribe(
      (success) => {
        console.log(success);
        sessionStorage.setItem("cartLength", success.cart.length);
        sessionStorage.setItem("cart", JSON.stringify(success.cart));
        this.notificationService.showNotification(
          "success",
          "Item successfully added to cart!!!"
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
