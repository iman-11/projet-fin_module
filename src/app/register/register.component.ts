import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { Register } from './register';
import { AuthenticationResponse } from './authentication-response';
import { VerificationRequest } from './verification-request';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class RegisterComponent {
  constructor(private fb:FormBuilder,private authservice:ServiceService,private router: Router){}
   message='';
  formregister!:FormGroup
  authresponse:AuthenticationResponse={}
  registrationData: Register={
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatpassword: ''
  }
  otpCode='';

  ngOnInit(): void {
    this.formregister=this.fb.group({
      firstname:this.fb.control(""),
      lastname:this.fb.control(""),
      email:this.fb.control(""),
      password:this.fb.control(""),
      repeatpassword:this.fb.control(""),
      role:this.fb.control(""), 
      mfaEnabled: this.fb.control(false),

    })
    this.formregister.get('mfaEnabled')?.valueChanges.subscribe((value) => {
      console.log('mfaenabled value changed:', value);
    });
  }

  handleregister() {

this.message='';
  

   this.registrationData = this.formregister.value; // Use the Register interface here    this.authService.register(this.registerRequest)
  console.log('Registration Data:', this.registrationData);
  this.authservice.register(this.registrationData)
  
    
  .subscribe({
    next: (response) => {
      if (response) {
        this.authresponse = response;
      } else {
        // inform the user
        this.message = 'Account created successfully\nYou will be redirected to the Login page in 3 seconds';
        setTimeout(() => {
          this.router.navigate(['login']);
        }, 3000)
      }
    }
  });

  }





  
    onUserTypeChange(event: Event): void {
      const userType = (event.target as HTMLSelectElement).value;
      this.formregister.patchValue({ role: userType });
    }



    verifyTfa() {
      this.message = '';
      const verifyRequest: VerificationRequest = {
        email: this.registrationData .email,
        code: this.otpCode
        



      };
      console.log("otp code",this.otpCode)
      console.log("email for  code",this.registrationData .email)


      this.authservice.verifyCode(verifyRequest)
        .subscribe({
          next: (response) => {
            this.message = 'Account created successfully\nYou will be redirected to the Welcome page in 3 seconds';
            setTimeout(() => {
              localStorage.setItem('token', response.accessToken as string);
              this.router.navigate(['/login']);
            }, 3000);
          }
        });
    }


  }

