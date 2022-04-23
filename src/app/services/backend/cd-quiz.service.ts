import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CdQuizService {

  constructor( private httpClient:HttpClient) { }

  all() : Observable<any>{
    return this.httpClient.get<any>(environment.QUIZ_API_ADMIN);
  }
  subjectQuizList(id_subject : any) : Observable<any>{
    return this.httpClient.get<any>(environment.QUIZ_API_ADMIN +`/subject-quiz-list/${id_subject}`);
  }
  create(data:any):Observable<any>{
    return this.httpClient.post<any>(environment.QUIZ_API_ADMIN,data);
  }
  findId(id_quiz : any) : Observable<any>{
    return this.httpClient.get<any>(environment.QUIZ_API_ADMIN +`/${id_quiz}`);
  }
  update(data:any ,id_quiz : any) : Observable<any>{
    return this.httpClient.put<any>(environment.QUIZ_API_ADMIN +`/${id_quiz}`,data);
  }
  delete(id_quiz : any):Observable<any>{
    return this.httpClient.delete<any>(environment.QUIZ_API_ADMIN +`/${id_quiz}`);
  }
  updateShuffle(id_quiz:any , data :any):Observable <any>{
    return this.httpClient.put<any>(environment.QUIZ_API_ADMIN +`/update-shuffle/${id_quiz}`,data);

  }
}
