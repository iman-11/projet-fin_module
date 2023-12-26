import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
export class LoginComponent implements OnInit{



  formlogin !:FormGroup;
  constructor(private fb:FormBuilder,private authservice:ServiceService,private router: Router){}
  ngOnInit(): void {
    this.formlogin=this.fb.group({
      email:this.fb.control(""),
      password:this.fb.control("")


    })
  }
 

  handlelogin(): void {
    const email = this.formlogin.get('email')?.value;
    const password = this.formlogin.get('password')?.value;
  
    this.authservice.login(email, password).subscribe({
      next: (data) => {
        // Handle successful authentication response
        this.authservice.loadprofile(data);
        this.router.navigate(['/profil']);

      },
      error: (error) => {
        console.error('Authentication error', error);
      },
      
      
    });
  }
  

}
