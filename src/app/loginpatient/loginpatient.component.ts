import { Component, OnInit } from '@angular/core';
import { AuthenticationResponse } from '../register/authentication-response';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { VerificationRequest } from '../register/verification-request';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-loginpatient',
  templateUrl: './loginpatient.component.html',
  styleUrls: ['./loginpatient.component.css']
})
export class LoginpatientComponent  implements OnInit{
  authResponse: AuthenticationResponse = {};
  message!: string;


  public totpForm!: FormGroup;
  doctorId: string  = '';


  formlogin !:FormGroup;
  constructor(private fb:FormBuilder,private authservice:ServiceService,private router: Router,
    private spinner: NgxSpinnerService,private route: ActivatedRoute
    
    ){}
  ngOnInit(): void {
    
    this.formlogin=this.fb.group({
      email:this.fb.control(""),
      password:this.fb.control("")

   


    })
    this.route.queryParams.subscribe((params) => {
      console.log('Route params:', params);
  
      // Check if id is available in the route parameters
      if (params['id']) {
        // Update the doctorId in the component
        this.doctorId = params['id'];
        console.log('doctorId in login:', this.doctorId);
  
        // Fetch the doctor details
  
        // Set idDoctor in the form
      
      }
    });
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
            this.router.navigate(['/Appointment'], { queryParams: { id: this.doctorId } });
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
          this.authservice.loadprofile1(response)

          this.router.navigate(['/Appointment'], { queryParams: { id: this.doctorId } });
        }
      });
  }
  
  

}
