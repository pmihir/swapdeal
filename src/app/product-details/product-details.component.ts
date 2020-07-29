import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { ProductDetailService } from "../common/product-detail.service";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"],
})
export class ProductDetailsComponent implements OnInit {
  description: boolean = true;
  displayBasic: boolean = false;
  objectKeys = Object.keys;
  tempProduct: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productDetailService: ProductDetailService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let productId;
      productId = params.get("productId");
      this.productDetailService.getNewProductDetail(productId).subscribe(
        (success) => {
          console.log(success);
          this.tempProduct = success[0];
          console.log(this.tempProduct);
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }
  // selectOption(color) {
  //   console.log(color);
  //   for (let i = 0; i < this.optionsArray.length; i++) {
  //     if (this.optionsArray[i].label == color) {
  //       console.log(color);
  //       this.tempProduct.image = this.optionsArray[i].id;
  //     }
  //   }
  // }

  showModal() {
    this.displayBasic = true;
  }
}
