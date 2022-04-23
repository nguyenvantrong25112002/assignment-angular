import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SubjectService } from 'src/app/services/frontend/subject.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  @Input('data-subject') subject:any;
 
  constructor(
    private spinner: NgxSpinnerService,
     private subjectService:SubjectService ,
    ) { }

  ngOnInit(): void {
  
  }
}
