import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SubjectService } from 'src/app/services/frontend/subject.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  timeLoad = 700;
  subjects :Array<any>= [];
  page = 1;
  count = 0;
  tableSize = 8;
  tableSizes = [3, 6, 9, 12];
  constructor(

    private spinner: NgxSpinnerService,
     private subjectService:SubjectService ,
  ) {
  }
  
  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.getAllSubject()
    }, this.timeLoad);
  }
  getAllSubject():void{
    this.subjectService.all().subscribe((res :any)  =>{
      this.subjects= res
      setTimeout(() => {
        this.spinner.hide();
      }, this.timeLoad);
    })
  }

  onTableDataChange(event:any){
    this.page = event;
     this.getAllSubject()
  }  

  onTableSizeChange(event:any): void {
    this.tableSize = event.target.value;
    this.page = 1;
     this.getAllSubject()

  }  
}
