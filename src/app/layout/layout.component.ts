import { Component, OnInit } from "@angular/core";
import { SignInService } from "../authentication/Services/sign-in.service";
import { Router } from "@angular/router";
import { stringify } from "querystring";
import { ProductDetailService } from "../common/product-detail.service";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.css"],
})
export class LayoutComponent implements OnInit {
  title = "swapdeal";
  userName: String = "Sign In";
  check: string;
  visibleSidebar1;
  message: any;
  searchKey: string;
  sidebarArr = [
    "Beauty, Health, Grocery",
    "TV, Appliances, Electronics",
    "Sport, Fitness, Bags, Luggage",
    "Men Fashion",
    "Women Fashion",
  ];
  results: any[] = [];
  text: string;
  searchProductArray: any[] = [];
  dummyArray: any[];
  cartLength: any;
  cartDisplay: boolean = true;

  ngOnInit() {}

  constructor(
    private signInService: SignInService,
    private router: Router,
    private productService: ProductDetailService
  ) {}

  ngDoCheck() {
    if (sessionStorage.getItem("access_token") == null) {
      this.userName = "Sign In";
      this.cartDisplay = false;
    } else {
      let userData = JSON.parse(sessionStorage.getItem("user"));
      this.userName = userData.username;
      // this.cartLength = JSON.parse(sessionStorage.getItem("user"));
      this.cartLength = sessionStorage.getItem("cartLength");
      // this.userName = sessionStorage.getItem("user.username");
    }
  }

  logout() {
    if (sessionStorage.removeItem("access_token") == null) {
      this.router.navigate(["/"]);
    }
  }

  changeCategory(category: string) {
    // this.dataService.changeMessage(category);
    console.log(category);
    this.router.navigate(["/store", category]);
  }

  searchProducts() {
    // this.fetchProductService();
    let searchKey = this.text;
    this.router.navigate(["/searchProducts", searchKey]);
  }
  search(event) {
    this.productService.getProductBySearch(event.query).subscribe((success) => {
      this.searchProductArray = [];
      this.dummyArray = success;
      console.log(success);
      success.forEach((hit, index) => {
        console.log(hit);
        this.searchProductArray.push(hit._source.name);
      });
      this.results = this.searchProductArray;
      console.log(this.results);
    }),
      (error) => {
        console.log(error);
      };
    this.text = event.query;
  }

  getSearchProduct(event) {
    console.log(event);
    this.dummyArray.forEach((hit, index) => {
      console.log(hit);
      if (hit._source.name == event) {
        let productId = hit._source.productId;
        this.router.navigate(["/product-details", productId]);
      }
    });
  }
}
