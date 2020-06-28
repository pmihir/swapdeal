import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PagerService } from './pager.service';
import { StoreService } from './store.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  
  categorySelected: string;
  productArray: any[];
  categoryFilterArray: any[] = [];
  selectedCategory: any[] = [];
  selectedBrand: any[] = [];
  hash = new Object();
  objectKeys = Object.keys;
  rangeValues: number[] = [1, 100000];
  displayUI: any[] = [];
  sortCategory = [
    { id: 0, label: "Select" },
    { id: 1, label: "High To Low" },
    { id: 2, label: "Low To High" }
  ];
  selected: number = 0;
  pager: any = {};
  minRange: number = 1;
  maxRange: number = 100000;
  resultTemp: any[];
  brandDict = new Object();
  isClicked = [];
  selectedIndex : number = 0;

  constructor(private spinner: NgxSpinnerService, private route: ActivatedRoute, private router: Router, private pagerService: PagerService, private storeService: StoreService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.categorySelected = params.get('category');
      this.getProductData();
    });
  }
  getProductData() {
    this.spinner.show();
    this.storeService.getElectronicsCollection(this.categorySelected).subscribe(
      (success) => {
        this.productArray = success;
        this.displayUI = this.productArray;
        this.resultTemp = this.productArray;
        for (let i = 0; i < this.productArray.length; i++) {
          let temp = this.productArray[i].category;
          if (!(temp in this.hash)) {
            this.hash[temp] = 1;
          }
          else {
            this.hash[temp] += 1;
          }
        }
        for (let j = 0; j < this.productArray.length; j++) {
          let tempBrand = this.productArray[j].brand;
          if (!(tempBrand in this.brandDict)) {
            this.brandDict[tempBrand] = 1;
          }
          else {
            this.brandDict[tempBrand] += 1;
          }
        }
        this.setPage(1);
        this.spinner.hide();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  setPage(page: number) {
    this.pager = this.pagerService.getPager(this.resultTemp.length, page);
    this.displayUI = this.resultTemp.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  selectOption(id: number) {
    if (id == 1) {
      this.resultTemp.sort(function (a, b) {
        if (parseInt(a.price) > parseInt(b.price)) return -1;
        if (parseInt(a.price) < parseInt(b.price)) return 1;
      });
    }
    else {
      this.resultTemp.sort(function (a, b) {
        if (parseInt(a.price) < parseInt(b.price)) return -1;
        if (parseInt(a.price) > parseInt(b.price)) return 1;
      });
    }
    this.setPage(1);
  }

  filterFunc(e, key?, type?) {
    if (key === undefined) {
      this.minRange = e.values[0];
      this.maxRange = e.values[1];
    }
    else {
      if (type == 'category') {
        if (this.selectedCategory.includes(key)) {
          this.selectedCategory = this.selectedCategory.filter(value => value != key);
        }
        else {
          this.selectedCategory.push(key);
        }
      }
      else if (type == "brand") {
        if (this.selectedBrand.includes(key)) {
          this.selectedBrand = this.selectedBrand.filter(value => value != key);
        }
        else {
          this.selectedBrand.push(key);
        }
      }
    }
    this.resultArray();
  }
  resultArray() {
    if (this.selectedBrand.length != 0 && this.selectedCategory.length == 0) {
      this.displayUI = this.productArray.filter((item) => {
        return (this.selectedBrand.includes(item.brand) && (parseInt(item.price) >= this.minRange) && parseInt(item.price) <= this.maxRange);
      })
    }
    else if (this.selectedBrand.length == 0 && this.selectedCategory.length != 0) {
      this.displayUI = this.productArray.filter((item) => {
        return (this.selectedCategory.includes(item.category) && (parseInt(item.price) >= this.minRange) && parseInt(item.price) <= this.maxRange);
      });
    }
    else if(this.selectedBrand.length != 0 && this.selectedCategory.length != 0){
      this.displayUI = this.productArray.filter((item) => {
        return (this.selectedBrand.includes(item.brand) && this.selectedCategory.includes(item.category) && (parseInt(item.price) >= this.minRange) && parseInt(item.price) <= this.maxRange);
      })
    }
    else {
      this.displayUI = this.productArray.filter((item) => {
        return (parseInt(item.price) >= this.minRange && parseInt(item.price) <= this.maxRange);
      })
    }
    this.resultTemp = this.displayUI;
    this.setPage(1);
  }

  setIndex(index : number){
    this.selectedIndex = index;    
  }

}
