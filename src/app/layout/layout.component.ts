import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  title = 'swapdeal';
  check :string;
  
  ngOnInit(){
    this.check = "0px";
    document.getElementById("mySidebar").style.width = "0px";
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

}
