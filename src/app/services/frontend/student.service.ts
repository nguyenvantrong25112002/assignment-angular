import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient:HttpClient) { }
  login(dataAuth:any): Observable<any>{
    return this.httpClient.post<any>(environment.STUDENT_API+ `/login_google`,dataAuth);
  }
}
