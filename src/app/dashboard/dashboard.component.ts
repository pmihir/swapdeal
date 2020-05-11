import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  newProducts : any[];
  showData : boolean = false;

  // newProducts : any[] = [
  //   {category:'Laptop',name : 'HP 14 PENTIUM GOLD(4GB/256GB/I5/2GB)',discountPrice:'RS 37990', price: 'RS 43000',image:'../../assets/product01.png'},
  //   {category:'Laptop',name : 'LENOVO V-145-AMD-A6(4GB RAM/500GB HDD,WINDOWS 10)',discountPrice:'RS 25,999', price: 'RS 27,979 ',image:'../../assets/lenovo v-146.jpg'},
  //   {category:'Laptop',name : 'DELL VOSTRO 3581(I3/4GB/1TB HDD,WINDOWS 10)',discountPrice:'RS 27,989 ', price: 'RS 39,097',image:'../../assets/dell vostro.webp'},
  //   {category:'Laptop',name : 'HP 14 7th GEN INTEL CORE(8 GB,256GB SSD,WINDOWS 10)',discountPrice:'RS 32,985 ', price: 'RS 35,999',image:'../../assets/hp-16.jpg'}
  // ];

  constructor(private dashboardService : DashboardService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getNewProductData();
  }

  getNewProductData(){
    this.spinner.show();
    this.dashboardService.getNewProductData().subscribe(
      (success)=>{
        this.spinner.hide();
        this.newProducts = success;
      },(error)=>{
        console.log(error);
      })
  }

}
