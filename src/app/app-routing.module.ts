import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './components/account/sign-up/sign-up.component';
import { CdHomeComponent } from './components/backend/cd-home/cd-home.component';
import { CdLayoutComponent } from './components/backend/cd-layout/cd-layout.component';
import { CdQuestionComponent } from './components/backend/cd-question/cd-question.component';
import { CdQuizComponent } from './components/backend/cd-quiz/cd-quiz.component';
import { CdSubjectComponent } from './components/backend/cd-subject/cd-subject.component';
import { HomeLayoutComponent } from './components/frontend/home-layout/home-layout.component';
import { HomeComponent } from './components/frontend/home/home.component';
import { HomeworkHistoryDetailComponent } from './components/frontend/homework-history/homework-history-detail/homework-history-detail.component';
import { HomeworkHistoryLayoutComponent } from './components/frontend/homework-history/homework-history-layout/homework-history-layout.component';
import { HomeworkHistoryListComponent } from './components/frontend/homework-history/homework-history-list/homework-history-list.component';
import { QuestionComponent } from './components/frontend/question/question.component';
import { QuizComponent } from './components/frontend/quiz/quiz.component';
import { SubjectComponent } from './components/frontend/subject/subject.component';
import { AuthLoginGuard } from './guand/auth-login.guard';

const routes: Routes = [
  {path:'sign-up',component:SignUpComponent},


  
  {path:'',component:HomeLayoutComponent,
    canActivate:[AuthLoginGuard],
    children:[
      {path:'',component:HomeComponent},
      {path:'subject/:id_subject',component:QuizComponent },
      {path:'quiz/:id_quiz',component:QuestionComponent},
      {
        path:'homework-history',component:HomeworkHistoryLayoutComponent,
      children:[
        {path:'',component:HomeworkHistoryListComponent},
        {path:':id',component:HomeworkHistoryDetailComponent},
      ]
      },
    ]  
  },
  {path :'admin' ,component:CdLayoutComponent,
    children:[
      {path:'',component:CdHomeComponent},
      {path:'subject',component:CdSubjectComponent},
      {path:'quiz/:id_subject',component:CdQuizComponent},
      {path:'quiz/:id_quiz/question',component:CdQuestionComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})

export class AppRoutingModule { }
