import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AutoFocusTarget } from '@angular/material/sidenav/drawer';


@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css'],

})
export class HomeLayoutComponent implements OnInit {
  opened = false;
  authUser : any ;
  timeLoad = 700;
  user :any;
  constructor(
    private router:Router,
    private spinner: NgxSpinnerService,
  ) {
  }
  imageBg : any;
  backgroundAray:Array <any>=[
    'bg.jpg',
    'bg2.jpg',
    'bg3.webp',
    'bg4.jpg',
    'bg5.jpg',
    'bg6.jpg',
  ];
  ngOnInit(): void {
    this.imageBgDefaut()
    this.authUser = localStorage.getItem('authUser')
    this.user= JSON.parse(this.authUser);
  }

  imageBgDefaut(){
    this.imageBg= this.backgroundAray[(Math.random() * this.backgroundAray.length) | 0]
  }

  setBd(img:any){
    this.spinner.show()
    this.opened= false;
    setTimeout(() => {
      this.imageBg = img;
      this.spinner.hide();
    }, this.timeLoad); 
  }

  logout(){
    localStorage.removeItem('authUser');
    this.router.navigate(['/sign-up'])
  }

 
}
