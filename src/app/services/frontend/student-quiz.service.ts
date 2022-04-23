import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentQuizService {

  constructor( private httpClient:HttpClient) { }
  checkAnswer(id:any, data : any) : Observable<any>{
    return this.httpClient.put<any>(environment.STUDENT_QUIZ_API+`/${id}`,data);
  }
  addToStudentQuizs(data : any): Observable<any>{
    return this.httpClient.post<any>(environment.STUDENT_QUIZ_API,data);
  }
  listStudentQuizs(): Observable<any>{
    return this.httpClient.get<any>(environment.STUDENT_QUIZ_API);
  }
  detailStudentQuizs(id:any): Observable<any>{
    return this.httpClient.get<any>(environment.STUDENT_QUIZ_API+ `/${id}`);
  }
}
