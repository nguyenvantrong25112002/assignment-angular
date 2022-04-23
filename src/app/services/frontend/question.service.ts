import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor( private httpClient:HttpClient) { }
  getQuestionHasManyQuiz(id_quiz : any) : Observable<any>{
      return this.httpClient.get<any>(environment.QUESTION_API+`/${id_quiz}` );
    }
}
