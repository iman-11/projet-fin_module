import { Component, OnInit } from '@angular/core';
import { AuthenticationResponse } from '../register/authentication-response';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-loginpatient',
  templateUrl: './loginpatient.component.html',
  styleUrls: ['./loginpatient.component.css']
})
export class LoginpatientComponent  implements OnInit{
  otpCode = '';
  authResponse: AuthenticationResponse = {};
  doctorId:string|null=null


  formlogin !:FormGroup;
  constructor(private fb:FormBuilder,private authservice:ServiceService,private router: Router,private route: ActivatedRoute ){}
  ngOnInit(): void {


    this.route.queryParams.subscribe((params) => {
      console.log('Route params:', params);

      // Check if id is available in the route parameters
      if (params['id']) {
        // Update the doctorId in the component
        this.doctorId = params['id'];
        console.log('Updated doctorId in component:', this.doctorId);

        // Fetch the doctor details
      
      }
    });
    this.formlogin=this.fb.group({
      email:this.fb.control(""),
      password:this.fb.control("")


    })
  }


  handlelogin() {
    const email = this.formlogin.get('email')?.value;
    const password = this.formlogin.get('password')?.value;
    this.authservice.login(email, password).subscribe({
      next: (response) => {

        this.authservice.loadprofile1(response);
        this.router.navigate(['/Appointment'], { queryParams: { id: this.doctorId } });
      },
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
