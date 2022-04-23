import { Component, OnInit } from '@angular/core';
import { CdQuizService } from 'src/app/services/backend/cd-quiz.service';
import { CdStudentQuizService } from 'src/app/services/backend/cd-student-quiz.service';
import { CdStudentService } from 'src/app/services/backend/cd-student.service';
import { CdSubjectService } from 'src/app/services/backend/cd-subject.service';
import { CdQuizComponent } from '../cd-quiz/cd-quiz.component';

@Component({
  selector: 'app-cd-home',
  templateUrl: './cd-home.component.html',
  styleUrls: ['./cd-home.component.css']
})
export class CdHomeComponent implements OnInit {

  constructor(
    private CdSubjectService:CdSubjectService,
    private CdQuizService:CdQuizService,
    private CdStudentQuizService:CdStudentQuizService,
    private CdStudentService:CdStudentService,
  ) { }
  subjectCount:Array <any>=[];
  quizCount:Array <any>=[];
  studenQuizCount:Array <any>=[];
  studentCount:Array <any>=[];
  ngOnInit(): void {
    this.lengthSubject()
    this.lengthQuiz()
    this.lengthStudenQuiz()
    this.lengthStude()
  }
  lengthSubject(){
      this.CdSubjectService.all().subscribe(res=>{
        this.subjectCount =res.length 
      })
  }
  lengthStudent(){
    this.CdSubjectService.all().subscribe(res=>{
      this.subjectCount =res.length 
    })
  }
  lengthQuiz(){
    this.CdQuizService.all().subscribe(res=>{
      this.quizCount =res.length 
    })
  }
  lengthStudenQuiz(){
    this.CdStudentQuizService.all().subscribe(res=>{
      this.studenQuizCount =res.length 
    })
  }
  lengthStude(){
    this.CdStudentService.all().subscribe(res=>{
      this.studentCount =res.length 
    })
  }
}

