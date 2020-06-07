import { Component, OnInit } from '@angular/core';
import { SignInService } from '../authentication/Services/sign-in.service';
import { Router } from '@angular/router';

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
  sidebarArr= ['Beauty, Health, Grocery', 'TV, Appliances, Electronics','Sport, Fitness, Bags, Luggage', 'Men Fashion', 'Women Fashion'];
  
  ngOnInit(){
    this.check = "0px";
    document.getElementById("mySidebar").style.width = "0px";
    
  }

  constructor(private signInService : SignInService, private router: Router){}

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
}
