import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CdQuestionService {

  constructor( private httpClient:HttpClient) { }
  getQuestionQuiz(id_quiz : any) : Observable<any>{
      return this.httpClient.get<any>(environment.QUESTION_API_ADMIN+`/list/${id_quiz}` );
  }
  store(data:any) :Observable<any>{
    return this.httpClient.post<any>(environment.QUESTION_API_ADMIN,data)
  }
  findId(id:any):Observable <any>{
    return this.httpClient.get<any>(environment.QUESTION_API_ADMIN+`/${id}`)
  }
  update(id:any ,data:any):Observable <any>{
    return this.httpClient.put<any>(environment.QUESTION_API_ADMIN+`/${id}`,data)
  }
  destroy(id:any):Observable<any>{
    return this.httpClient.delete<any>(environment.QUESTION_API_ADMIN+`/${id}`)
  }
  edit(id:any):Observable <any>{
    return this.httpClient.get<any>(environment.QUESTION_API_ADMIN+`/edit/${id}`)

  }
}
