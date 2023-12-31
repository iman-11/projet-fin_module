import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { AuthenticationResponse } from '../register/authentication-response';
import { VerificationRequest } from '../register/verification-request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
export class LoginComponent implements OnInit{
  otpCode = '';
  authResponse: AuthenticationResponse = {};



  formlogin !:FormGroup;
  constructor(private fb:FormBuilder,private authservice:ServiceService,private router: Router){}
  ngOnInit(): void {
    this.formlogin=this.fb.group({
      email:this.fb.control(""),
      password:this.fb.control("")


    })
  }

  handlelogin() {
    const email = this.formlogin.get('email')?.value;
    const password = this.formlogin.get('password')?.value;
    this.authservice.login(email, password)
      .subscribe({
        next: (response) => {
         
          this.authservice.loadprofile1(response)

          this.router.navigate(['/doctor']);


        }
      });
  }

  // verifyCode() {
  //   const verifyRequest: VerificationRequest = {
  //     email:this.formlogin.get('email')?.value,
  //     code: this.otpCode
  //   };
    
  //   this.authservice.verifyCode(verifyRequest)
  //     .subscribe({
  //       next: (response) => {
  //         localStorage.setItem('token', response.accessToken as string);
  //         this.router.navigate(['welcome']);
  //       }
  //     });
  // }
  

}
