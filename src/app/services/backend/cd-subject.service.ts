import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CdSubjectService {

  constructor(private httpClient:HttpClient) { }
  all(): Observable<any>{
    return this.httpClient.get<any>(environment.SUBJECT_API_ADMIN);
  }

  // admin
  delete(id_subject : any) : Observable<any>{
    return this.httpClient.delete<any>(environment.SUBJECT_API_ADMIN +`/${id_subject}`);
  }
  create(data:any):Observable<any>{
    return this.httpClient.post<any>(environment.SUBJECT_API_ADMIN,data);
  }
  update(data:any ,id_subject : any) : Observable<any>{
    return this.httpClient.put<any>(environment.SUBJECT_API_ADMIN +`/${id_subject}`,data);
  }
  findId(id_subject : any) : Observable<any>{
    return this.httpClient.get<any>(environment.SUBJECT_API_ADMIN +`/${id_subject}`);
  }
}
