import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CdAnswerService {

  constructor(private httpClient:HttpClient) { }
  // answerQuiz(id_quiz:any):Observable <any>{
  //   return this.httpClient.get<any>(environment.ANSWER_API_ADMIN+ `/${id_quiz}`);

  // }
}
