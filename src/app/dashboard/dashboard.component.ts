import { Component, OnInit } from "@angular/core";
import { DashboardService } from "./dashboard.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Observable, timer, interval, Subscription } from "rxjs";
import { take, map } from "rxjs/operators";
import { CountDownService } from "./count-down.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  showData: boolean = false;
  newProductDisplay: any[] = [];
  displayIndex = 0;
  displaySize = 4;
  newProducts: any;
  countDown: Subscription;
  counter = 36000;
  tick = 1000;
  hours: number;
  minutes: number;
  seconds: number;
  currentProduct: any[];
  topSells = [];
  topSellDisplay: any[];
  arr = Array;

  constructor(
    private dashboardService: DashboardService,
    private spinner: NgxSpinnerService,
    private countDownService: CountDownService
  ) {}

  ngOnInit(): void {
    this.getNewProductData();
    this.countdownTimer();
  }

  countdownTimer() {
    this.countDownService.getCounter(this.tick).subscribe(() => {
      this.hours = Math.floor(this.counter / 3600);
      this.minutes = Math.floor((this.counter % 3600) / 60);
      this.seconds = Math.floor((this.counter % 3600) % 60);
      this.counter--;
    });
  }

  next(dataCategory) {
    this.displayIndex += 1;
    if (dataCategory == "NewProduct") {
      if (this.currentProduct.length <= this.displayIndex * this.displaySize) {
        this.newProductDisplay = this.currentProduct.slice(0, this.displaySize);
        this.displayIndex = 0;
      } else {
        const start = this.displayIndex * this.displaySize;
        this.newProductDisplay = this.currentProduct.slice(
          start,
          start + this.displaySize
        );
      }
    } else {
      if (this.topSells.length <= this.displayIndex * this.displaySize) {
        this.topSellDisplay = this.topSells.slice(0, this.displaySize);
        this.displayIndex = 0;
      } else {
        const start = this.displayIndex * this.displaySize;
        this.topSellDisplay = this.topSells.slice(
          start,
          start + this.displaySize
        );
      }
    }
  }

  prev(dataCategory) {
    this.displayIndex -= 1;
    if (dataCategory == "NewProduct") {
      if (this.displayIndex < 0) {
        this.displayIndex = this.currentProduct.length / this.displaySize - 1;
        const start = this.displayIndex * this.displaySize;
        this.newProductDisplay = this.currentProduct.slice(
          start,
          start + this.displaySize
        );
      } else {
        const start = this.displayIndex * this.displaySize;
        this.newProductDisplay = this.currentProduct.slice(
          start,
          start + this.displaySize
        );
      }
    } else {
      if (this.displayIndex < 0) {
        this.displayIndex = this.topSells.length / this.displaySize - 1;
        const start = this.displayIndex * this.displaySize;
        this.topSellDisplay = this.topSells.slice(
          start,
          start + this.displaySize
        );
      } else {
        const start = this.displayIndex * this.displaySize;
        this.topSellDisplay = this.topSells.slice(
          start,
          start + this.displaySize
        );
      }
    }
  }

  getNewProductData() {
    this.spinner.show();
    this.dashboardService.getNewProductData().subscribe(
      (success) => {
        console.log(success);
        this.newProducts = success[0];
        this.currentProduct = this.newProducts["Laptop"];
        this.newProductDisplay = this.currentProduct.slice(0, this.displaySize);
        this.getTopSellData();
        this.spinner.hide();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getTopSellData() {
    for (let key in this.newProducts) {
      let tempArray = this.newProducts[key];
      for (let key in tempArray) {
        this.topSells.push(tempArray[key]);
      }
    }
    this.topSells.sort(function (a, b) {
      if (parseInt(a.rating) < parseInt(b.rating)) return -1;
      if (parseInt(a.rating) > parseInt(b.rating)) return 1;
    });
    this.topSells = this.topSells.reverse().slice(0, 12);
    this.topSellDisplay = this.topSells.slice(0, this.displaySize);
  }

  changeProduct(category) {
    this.currentProduct = this.newProducts[category];
    this.newProductDisplay = this.currentProduct.slice(0, this.displaySize);
  }
}
