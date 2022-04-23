import { Component, HostListener, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-back-page',
  templateUrl: './back-page.component.html',
  styleUrls: ['./back-page.component.css']
})
export class BackPageComponent implements OnInit {

  constructor(private location: Location) { }
  @HostListener('click')
  onClick() {
    this.location.back();
  }
  ngOnInit(): void {
  }
   
  
}
