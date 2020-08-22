import { Component, OnInit } from "@angular/core";
import { CartService } from "./cart.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  value18: Number = 1;
  cartArray: any = [];
  totalPrice: number = 0;
  delieveryPrice: number = 500;
  productTotal: number = 0;
  calculatedPrice: number;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    let array: any = JSON.parse(sessionStorage.getItem("cart"));
    for (let i in array) {
      this.productTotal += array[i].price * array[i].qty;
      this.cartArray.push(array[i]);
    }
    this.totalPrice = this.productTotal + this.delieveryPrice;
  }

  changeQty(productId, changedQty) {
    let user = JSON.parse(sessionStorage.getItem("user"));
    let cartObj = {
      productId: productId,
      quantity: changedQty.value,
      userId: user._id,
    };
    this.cartService.changeQty(cartObj).subscribe(
      (success) => {
        this.productTotal = 0;
        this.cartArray = success.cart;
        for (let i in this.cartArray) {
          this.productTotal += this.cartArray[i].price * this.cartArray[i].qty;
        }
        this.totalPrice = this.productTotal + this.delieveryPrice;
        sessionStorage.setItem("cart", JSON.stringify(success.cart));
      },
      (error) => {
        console.log(error);
      }
    );
  }

  removeProduct(produtId: any) {
    let user = JSON.parse(sessionStorage.getItem("user"));
    let productData = {
      userId: user._id,
      productId: produtId,
    };
    this.cartService.removeProduct(productData).subscribe(
      (success) => {
        this.productTotal = 0;
        this.cartArray = success.cart;
        for (let i in this.cartArray) {
          this.productTotal += this.cartArray[i].price * this.cartArray[i].qty;
        }
        this.totalPrice = this.productTotal + this.delieveryPrice;
        sessionStorage.setItem("cart", JSON.stringify(success.cart));
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
