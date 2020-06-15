import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Route } from '@angular/compiler/src/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PagerService } from './pager.service';
import { StoreService } from './store.service';

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
  productDisplay: any[] = [];
  hash = new Object();
  objectKeys = Object.keys;
  rangeValues: number[] = [1, 10000];
  displayUI: any[] = [];
  sortCategory = [
    { id: 0, label: "" },
    { id: 1, label: "High To Low" },
    { id: 2, label: "Low To High" }
  ];
  selected: number = 0;
  pager: any = {};

  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router, private pagerService: PagerService, private storeService: StoreService) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.categorySelected = params.get('category');
      this.getProductData();
    });
  }
  getProductData() {
    this.storeService.getElectronicsCollection(this.categorySelected).subscribe(
      (success) => {
        console.log(success);
        this.productArray = success;
        this.displayUI = this.productArray;
        this.productDisplay = this.productArray;
        for (let i = 0; i < this.productArray.length; i++) {
          let temp = this.productArray[i].category;
          if (!(temp in this.hash)) {
            this.hash[temp] = 1;
          }
          else {
            this.hash[temp] += 1;
          }
        }
        this.setPage(1);
      },
      (error) => {
        console.log(error);
      }
    );
  }


  setPage(page: number) {
    this.pager = this.pagerService.getPager(this.productArray.length, page);
    this.displayUI = this.productArray.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  changeCategory(event, item) {
    console.log(event);
    if (this.selectedCategory.includes(item)) {
      this.selectedCategory = this.selectedCategory.filter(value => value != item);
    }
    else {
      this.selectedCategory.push(item);
    }
    if (this.selectedCategory.length == 0) {
      this.displayUI = this.productArray;
    }
    else {
      this.displayUI = this.productArray.filter((event) => {
        return this.selectedCategory.includes(event.category);
      })
    }
  }

  changeRange(e) {
    if (this.selectedCategory.length == 0) {
      this.displayUI = this.productArray.filter((item) => {
        return (parseInt(item.price) >= parseInt(e.values[0]) && parseInt(item.price) <= parseInt(e.values[1]));
      })
    }
    else {
      this.displayUI = this.productArray.filter((event) => {
        return (this.selectedCategory.includes(event.category) && (parseInt(event.price) >= parseInt(e.values[0]) && parseInt(event.price) <= parseInt(e.values[1])));
      });
    }
  }

  selectOption(id: number) {
    console.log(this.selected);
    if (id == 1) {
      this.productArray.sort(function (a, b) {
        if (parseInt(a.price) > parseInt(b.price)) return -1;
        if (parseInt(a.price) < parseInt(b.price)) return 1;
      });
    }
    else {
      this.productDisplay.sort(function (a, b) {
        if (parseInt(a.price) < parseInt(b.price)) return -1;
        if (parseInt(a.price) > parseInt(b.price)) return 1;
      });
    }
    this.displayUI = this.productArray;
  }

}
