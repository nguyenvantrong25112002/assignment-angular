import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  constructor( private httpClient:HttpClient) { }
  //client


  all(): Observable<any>{
    return this.httpClient.get<any>(environment.SUBJECT_API);
  }


  findId(id_subject : any) : Observable<any>{
    return this.httpClient.get<any>(environment.SUBJECT_API +`/${id_subject}`);
  }
}
