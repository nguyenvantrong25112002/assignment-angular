import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { AuthService } from 'src/app/services/auth.service';
import { StudentService } from 'src/app/services/frontend/student.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(
    private socialAuthService:SocialAuthService,
    private studentService:StudentService,
    private router:Router,

  ) { }

  ngOnInit(): void {
  }
  loginGG(){
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
    .then(authData =>{
      this.studentService.login(authData).subscribe(res=>{
        localStorage.setItem('authUser',JSON.stringify(res.payload));
        localStorage.getItem('authUser')
        this.router.navigate(['/']);
      });
    })
  }
}
