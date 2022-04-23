import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { StudentQuizService } from 'src/app/services/frontend/student-quiz.service';

@Component({
  selector: 'app-homework-history-detail',
  templateUrl: './homework-history-detail.component.html',
  styleUrls: ['./homework-history-detail.component.css']
})
export class HomeworkHistoryDetailComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private StudentQuizService:StudentQuizService
  ) {
  }
  studentQuiz: any;
  ngOnInit(): void {
    this.spinner.show()
    setTimeout(() => {
      this.detailStudentQuiz()
    }, 800);
  }

  detailStudentQuiz(){
    this.StudentQuizService.detailStudentQuizs(this.getId()).subscribe(res=>{
      this.studentQuiz= res.payload
     setTimeout(() => {
       this.spinner.hide()
     }, 800);
      
    })
  }
  getId(){
    return this.route.snapshot.paramMap.get('id');
  }
}
