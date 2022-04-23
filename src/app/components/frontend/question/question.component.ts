import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MarkService } from 'src/app/services/frontend/mark.service';
import { QuestionService } from 'src/app/services/frontend/question.service';
import { StudentQuizService } from 'src/app/services/frontend/student-quiz.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  
  constructor(
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router:Router,
    private questionService:QuestionService,
    private studentQuizService:StudentQuizService,
    ) {
      this.authUser = localStorage.getItem('authUser')
      this.user= JSON.parse(this.authUser);
  }
  timeLoad = 700;
  page:number = 0;
  length_questions:any;
  answertArr:Array <any>=[];
  result:Array <any>=[];
  questions:any;
  authUser : any ;
  user :any;
  studentQuizId :any;
  ngOnInit(): void {
    this.spinner.show()
    setTimeout(() => {
      this.getListQuiz()
    }, this.timeLoad);
    setTimeout(() => {
      this.addToStudentQuizs()
    }, 4000);
  }
  addToStudentQuizs(){
   const data ={
    'student_id':this.user.id,
    'quiz_id':this.getIdQuiz(),
   }
    this.studentQuizService.addToStudentQuizs(data).subscribe({
      next:(res)=>{
       this.studentQuizId =res.id
      },
      error:(err)=>{
       console.log(err);  
      }
    })
  }
  getListQuiz(){
    this.questionService.getQuestionHasManyQuiz(this.getIdQuiz()).subscribe((res :any)  =>{
     this.questions = res
     this.length_questions= res.length;
     setTimeout(() => {
      this.spinner.hide()
    }, this.timeLoad);
    })
  }
  getIdQuiz(){
    return Number(this.route.snapshot.paramMap.get('id_quiz')) ;
  }
  next(){
   this.page ++
  }
  previous(){
    this.page --
  }

  changeAnswer(question_id : any , answer_id : any){
    var key_check : any = null;
    const check = this.answertArr.filter(function(data : any , key : any){
      if(data.question_id == question_id) key_check = key ;
      return data.question_id == question_id;
    })    
    if(check.length > 0){
      this.answertArr[key_check].answer_id = answer_id;
    }else{
      this.answertArr.push({
          question_id: question_id,
          answer_id: answer_id,
        });
    }
  }
  checkedAnswer(id : any) : boolean {
    const check = this.answertArr.filter(function(data : any , key : any){
      return data.answer_id == id;
    })
     if(check.length > 0){
       return true;
    }else{
      return false;
    }

  }

  checkAnswer(){
    // console.log(this.answertArr);
    
    this.result.push({
      'quiz_id':this.getIdQuiz(),
      'questionsAnswer': this.answertArr,
    });
    this.studentQuizService.checkAnswer(this.studentQuizId,this.result).subscribe( res=>{
      this.result = [];
      this.answertArr =[];
      Swal.fire({
        title: `Điểm của bạn là : ${res.payload} / 10đ !!`,
        width: 600,
        padding: '6em',
        color: '#ffffff',
        background: '#fff top  no-repeat url(https://i.pinimg.com/736x/29/cd/43/29cd43acc0ee8ae3b8967a77d82262dc.jpg)',
        backdrop: `
          rgba(0,0,123,0.4)
          url("/images/nyan-cat.gif")
          left top
          no-repeat
        `
      }).then((result) => {
        this.router.navigate(['/homework-history'])
      })
    })
    
  }
}
