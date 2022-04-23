import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public logginUser: BehaviorSubject<any>;
  constructor(private http: HttpClient) {
    this.logginUser  = new BehaviorSubject(
      JSON.parse(localStorage.getItem('login_user') || "{}")
    );
  }
  getLoggedInUser(){
    return this.logginUser.value;
  }
  login(dataAuth:any): Observable<any>{
    return this.http.post<any>(environment.STUDENT_API,dataAuth)
      .pipe(
        map(data => {
          if(data.length > 0){
            this.logginUser.next(data[0]);
            localStorage.setItem('login_user', JSON.stringify(data[0]));
            return data[0];
          }
          localStorage.removeItem('login_user');
          this.logginUser.next({});
          return null;
        })
      )
  }

}