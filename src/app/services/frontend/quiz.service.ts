import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor( private httpClient:HttpClient) { }
  getQuizBelongSubject(id_subject : any) : Observable<any>{
    return this.httpClient.get<any>(environment.QUIZ_API +`/${id_subject}` );
  }

  findId(id_quiz : any) : Observable<any>{
    return this.httpClient.get<any>(environment.QUIZ_API +`/${id_quiz}`);
  }
 
}
