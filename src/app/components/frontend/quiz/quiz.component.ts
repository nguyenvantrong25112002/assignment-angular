import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner';
import { QuizService } from 'src/app/services/frontend/quiz.service';
import { SubjectService } from 'src/app/services/frontend/subject.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

 
  constructor(
    private route: ActivatedRoute,
    private http:HttpClient,
    private subjectService:SubjectService,
    private quizService:QuizService,
    private spinner: NgxSpinnerService,
  ) { }
  timeLoad = 700;
  page = 1;
  count = 0;
  tableSize = 1;
  // id_subject:any ="";
  quizs:any;
  URLAPI=`http://localhost:3000/`;
  ngOnInit(): void {
    this.spinner.show()

    setTimeout(() => {
      this.getListQuiz()
    }, this.timeLoad);
  }
  getListQuiz(){

    this.quizService.getQuizBelongSubject(this.getIdSubject()).subscribe(res   =>{
      this.quizs = res;  
      setTimeout(() => {
        this.spinner.hide();
      }, this.timeLoad); 
    })
    
  }
  getIdSubject(){
   return this.route.snapshot.paramMap.get('id_subject');
  }


     

  
}
