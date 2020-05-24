import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, timer, interval, Subscription } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { CountDownService } from './count-down.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // newProducts : any[];
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

  constructor(private dashboardService: DashboardService, private spinner: NgxSpinnerService, private countDownService: CountDownService) {

  }

  ngOnInit(): void {
    this.getNewProductData();
    this.countdownTimer();
  }

  countdownTimer(){
    this.countDownService.getCounter(this.tick).subscribe(() => {
      this.hours = Math.floor(this.counter / 3600);
      this.minutes = Math.floor(this.counter % 3600 / 60);
      this.seconds = Math.floor(this.counter % 3600 % 60);
      this.counter--;
    })
  }

  next() {
    this.displayIndex += 1;
    if (this.currentProduct.length <= (this.displayIndex * this.displaySize)) {
      this.newProductDisplay = this.currentProduct.slice(0, this.displaySize);
      this.displayIndex = 0;
    }
    else {
      const start = this.displayIndex * this.displaySize;
      this.newProductDisplay = this.currentProduct.slice(start, (start + this.displaySize));
    }
  }

  prev() {
    this.displayIndex -= 1;
    if (this.displayIndex < 0) {
      this.displayIndex = (this.currentProduct.length / this.displaySize) - 1;
      const start = this.displayIndex * this.displaySize;
      this.newProductDisplay = this.currentProduct.slice(start, (start + this.displaySize));
    }
    else {
      const start = this.displayIndex * this.displaySize;
      this.newProductDisplay = this.currentProduct.slice(start, (start + this.displaySize));
    }
  }

  getNewProductData() {
    this.spinner.show();
    this.dashboardService.getNewProductData().subscribe(
      (success) => {
        this.newProducts = success[0];
        this.currentProduct = this.newProducts["Laptop"];
        this.newProductDisplay = this.currentProduct.slice(0, this.displaySize);
        this.spinner.hide();
      }, (error) => {
        console.log(error);
      })
  }

  changeProduct(category) {
    this.currentProduct = this.newProducts[category];
    this.newProductDisplay = this.currentProduct.slice(0, this.displaySize);
  }
}
