import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // newProducts : any[];
  showData : boolean = false;
  newProductDisplay : any[] = [];
  displayIndex = 0;
  displaySize = 4;
  newProducts : any[];

  // newProducts : any[] = [
  //   {category:'Laptop',name : 'HP 14 PENTIUM GOLD(4GB/256GB/I5/2GB)',discountPrice:'RS 37990', price: 'RS 43000',image:'../../assets/product01.png'},
  //   {category:'Laptop',name : 'LENOVO V-145-AMD-A6(4GB RAM/500GB HDD,WINDOWS 10)',discountPrice:'RS 25,999', price: 'RS 27,979 ',image:'../../assets/lenovo v-146.jpg'},
  //   {category:'Laptop',name : 'DELL VOSTRO 3581(I3/4GB/1TB HDD,WINDOWS 10)',discountPrice:'RS 27,989 ', price: 'RS 39,097',image:'../../assets/dell vostro.webp'},
  //   {category:'Laptop',name : 'HP 14 7th GEN INTEL CORE(8 GB,256GB SSD,WINDOWS 10)',discountPrice:'RS 32,985 ', price: 'RS 35,999',image:'../../assets/hp-16.jpg'},
  //   {category:'Laptop',name : 'HP 15 PENTIUM GOLD(4GB/256GB/I5/2GB)',discountPrice:'RS 37990', price: 'RS 43000',image:'../../assets/product01.png'},
  //   {category:'Laptop',name : 'HP 16 PENTIUM GOLD(4GB/256GB/I5/2GB)',discountPrice:'RS 37990', price: 'RS 43000',image:'../../assets/product01.png'},
  //   {category:'Laptop',name : 'HP 17 PENTIUM GOLD(4GB/256GB/I5/2GB)',discountPrice:'RS 37990', price: 'RS 43000',image:'../../assets/product01.png'},
  //   {category:'Laptop',name : 'HP 18 PENTIUM GOLD(4GB/256GB/I5/2GB)',discountPrice:'RS 37990', price: 'RS 43000',image:'../../assets/product01.png'}
  // ];

  constructor(private dashboardService : DashboardService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getNewProductData();
    
  }

  next(){
    this.displayIndex += 1;
    if(this.newProducts.length <= (this.displayIndex * this.displaySize)){
      this.newProductDisplay = this.newProducts.slice(0,this.displaySize);
      this.displayIndex = 0;
    }
    else{
      const start = this.displayIndex * this.displaySize;
      this.newProductDisplay = this.newProducts.slice(start, (start+this.displaySize));
    } 
  }

  prev(){
    this.displayIndex -= 1;
    if(this.displayIndex < 0){
      this.displayIndex = (this.newProducts.length / this.displaySize) - 1;
      const start = this.displayIndex * this.displaySize;
      this.newProductDisplay = this.newProducts.slice(start, (start + this.displaySize));
    }
    else{
      const start = this.displayIndex * this.displaySize;
        this.newProductDisplay = this.newProducts.slice(start, (start + this.displaySize));
    }
  }

  getNewProductData(){
    this.spinner.show();
    this.dashboardService.getNewProductData().subscribe(
      (success)=>{
        this.newProducts = success;
        this.newProductDisplay = this.newProducts.slice(0,this.displaySize);
        this.spinner.hide();
      },(error)=>{
        console.log(error);
      })
  }

}
