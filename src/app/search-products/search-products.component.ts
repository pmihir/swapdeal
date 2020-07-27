import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProductDetailService } from '../common/product-detail.service';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.css']
})
export class SearchProductsComponent implements OnInit {

  searchKey: string;
  displayUI: any[] = [];
  searchProductArray: any[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private productService: ProductDetailService) { }

  ngOnInit(): void {
    console.log("in ng on init");
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.searchKey = params.get("searchKey");
      this.getSearchData();
    });
  }

  getSearchData() {
    this.productService.getProductBySearch(this.searchKey).subscribe((success) => {
      console.log(success);
      this.searchProductArray = [];
      success.forEach((hit, index) => {
        console.log(hit);
        this.searchProductArray.push(hit._source);
      });
      this.displayUI = this.searchProductArray;
    }),
      (error) => {
        console.log(error);
      }
  }

}
