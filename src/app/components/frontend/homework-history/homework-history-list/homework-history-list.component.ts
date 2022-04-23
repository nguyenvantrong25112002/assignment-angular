import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { StudentQuizService } from 'src/app/services/frontend/student-quiz.service';

@Component({
  selector: 'app-homework-history-list',
  templateUrl: './homework-history-list.component.html',
  styleUrls: ['./homework-history-list.component.css']
})
export class HomeworkHistoryListComponent implements OnInit {

  studentquizsArr:any;
  constructor(
    private spinner: NgxSpinnerService,
    private studentQuizService:StudentQuizService
  ) {
  }
  
  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.listStudentQuizs()
    }, 800);
    
  }
  listStudentQuizs(){
    this.studentQuizService.listStudentQuizs().subscribe({
      next:(res)=>{
        this.studentquizsArr = res;
       setTimeout(() => {
          this.spinner.hide()
       }, 800);
        
      },
      error:(err)=>{
        
      }
    })
  }

}
