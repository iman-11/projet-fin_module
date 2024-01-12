import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { AuthenticationResponse } from '../register/authentication-response';
import { VerificationRequest } from '../register/verification-request';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
export class LoginComponent implements OnInit{
  authResponse: AuthenticationResponse = {};
  message!: string;


  public totpForm!: FormGroup;


  formlogin !:FormGroup;
  constructor(private fb:FormBuilder,private authservice:ServiceService,private router: Router,
    private spinner: NgxSpinnerService
    
    ){}
  ngOnInit(): void {
    this.formlogin=this.fb.group({
      email:this.fb.control(""),
      password:this.fb.control("")

    


    })
    this.totpForm = new FormGroup({
      totp_digit1: new FormControl('', [Validators.required, Validators.maxLength(1), Validators.pattern("^[0-9]{1}$")]),
      totp_digit2: new FormControl('', [Validators.required, Validators.maxLength(1), Validators.pattern("^[0-9]{1}$")]),
      totp_digit3: new FormControl('', [Validators.required, Validators.maxLength(1), Validators.pattern("^[0-9]{1}$")]),
      totp_digit4: new FormControl('', [Validators.required, Validators.maxLength(1), Validators.pattern("^[0-9]{1}$")]),
      totp_digit5: new FormControl('', [Validators.required, Validators.maxLength(1), Validators.pattern("^[0-9]{1}$")]),
      totp_digit6: new FormControl('', [Validators.required, Validators.maxLength(1), Validators.pattern("^[0-9]{1}$")]),
    });
  }
  moveToNextElement(formControlName: string, nextElement: string) {
    if (this.totpForm.get(formControlName)?.valid) {
      document.getElementById(nextElement)?.focus();
    }
  }
  clearValue(formControlName: string) {
    this.totpForm.get(formControlName)?.setValue("");
  
  }

  handlelogin() {
    this.spinner.show();

    const email = this.formlogin.get('email')?.value;
    const password = this.formlogin.get('password')?.value;
    this.authservice.login(email, password)
       .subscribe({
        next: (response) => {
          this.authResponse = response;
          if (!this.authResponse.mfaEnabled) {
            this.authservice.loadprofile1(response)
            this.router.navigate(['/doctor']);
          }
          this.spinner.hide()
        }
      });
  }

 
  

  verifyCode() {

    let code1: string = this.totpForm.get("totp_digit1")?.value
      + this.totpForm.get("totp_digit2")?.value
      + this.totpForm.get("totp_digit3")?.value
      + this.totpForm.get("totp_digit4")?.value
      + this.totpForm.get("totp_digit5")?.value
      + this.totpForm.get("totp_digit6")?.value;

    const verifyRequest: VerificationRequest = {
      email:this.formlogin.get('email')?.value,
      code: code1
    };
    
    this.authservice.verifyCode(verifyRequest)
      .subscribe({
        next: (response) => {
          localStorage.setItem('token', response.accessToken as string);
          this.router.navigate(['/section']);
        }
      });
  }
  

}
