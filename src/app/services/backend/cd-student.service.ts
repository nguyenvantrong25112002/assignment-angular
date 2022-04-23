import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CdStudentService {

  constructor( private httpClient:HttpClient) { }

  all() : Observable<any>{
    return this.httpClient.get<any>(environment.STUDEN_API_ADMIN);
  }
}
