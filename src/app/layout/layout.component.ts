import { Component, OnInit } from '@angular/core';
import { SignInService } from '../authentication/Services/sign-in.service';
import { Router } from '@angular/router';
import { DataService } from '../store/data.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  title = 'swapdeal';
  userName : String = "Sign In";
  check :string;
  visibleSidebar1;
  message:any;
  sidebarArr= ['Beauty, Health, Grocery', 'TV, Appliances, Electronics','Sport, Fitness, Bags, Luggage', 'Men Fashion', 'Women Fashion'];
  
  ngOnInit(){
    
    this.check = "0px";
    document.getElementById("mySidebar").style.width = "0px";
    this.dataService.currentMessage.subscribe(message=>this.message=message);
  }

  constructor(private signInService : SignInService, private router: Router,private dataService : DataService){}

  ngDoCheck(){
    if(sessionStorage.getItem('access_token') == null){
      this.userName = 'Sign In';
    }
    else{
      this.userName = sessionStorage.getItem('username');
    }
  }

  sidenavToggle(){
    if(this.check == "150px"){
      document.getElementById("mySidebar").style.width = "0px";
      // document.getElementById("main").style.marginLeft="0px";
      this.check = "0px";
    }
    else{
      document.getElementById("mySidebar").style.width = "150px";
      // document.getElementById("main").style.marginLeft="50px";
      this.check = "150px";
    }
  }

  logout(){
    if (sessionStorage.removeItem('access_token') == null) {
      this.router.navigate(['/']);
    }
  }

  changeCategory(category : string){
    // this.dataService.changeMessage(category);
    console.log(category);
    this.router.navigate(['/store',category]);
  }
}
