import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeLayoutComponent } from './components/frontend/home-layout/home-layout.component';
import { SubjectComponent } from './components/frontend/subject/subject.component';
import { QuizComponent } from './components/frontend/quiz/quiz.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { QuestionComponent } from './components/frontend/question/question.component';
import { HomeComponent } from './components/frontend/home/home.component';
import { CdLayoutComponent } from './components/backend/cd-layout/cd-layout.component';
import { CdHomeComponent } from './components/backend/cd-home/cd-home.component';
import { CdSubjectComponent } from './components/backend/cd-subject/cd-subject.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdQuizComponent } from './components/backend/cd-quiz/cd-quiz.component';
import { BackPageComponent } from './components/back-page/back-page.component';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {GoogleLoginProvider,FacebookLoginProvider} from 'angularx-social-login';
import { environment } from 'src/environments/environment';
/* Angular material 8 */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from "ngx-spinner";

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CdQuestionComponent } from './components/backend/cd-question/cd-question.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { HomeworkHistoryDetailComponent } from './components/frontend/homework-history/homework-history-detail/homework-history-detail.component';
import { HomeworkHistoryListComponent } from './components/frontend/homework-history/homework-history-list/homework-history-list.component';
import { HomeworkHistoryLayoutComponent } from './components/frontend/homework-history/homework-history-layout/homework-history-layout.component';
import { LoadingComponent } from './components/loading/loading.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeLayoutComponent,
    SubjectComponent,
    QuizComponent,
    QuestionComponent,
    HomeComponent,
    CdLayoutComponent,
    CdHomeComponent,
    CdSubjectComponent,
    CdQuizComponent,
    BackPageComponent,
    CdQuestionComponent,
    HomeworkHistoryDetailComponent,
    HomeworkHistoryListComponent,
    HomeworkHistoryLayoutComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,

    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule , 
    MatButtonModule,  
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatSidenavModule,
    MatSelectModule,
    MatGridListModule,
    MatProgressSpinnerModule,



    SocialLoginModule,


    AngularFireModule.initializeApp(environment.firebase),
    // AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  exports: [
    NgxSpinnerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers:[
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.GOOGLE_CLIENT_ID
            )
          },
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent] ,
})
export class AppModule { }
