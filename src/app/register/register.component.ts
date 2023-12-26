import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { Register } from './register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class RegisterComponent {
  constructor(private fb:FormBuilder,private authservice:ServiceService,private router: Router){}

  formregister!:FormGroup

  ngOnInit(): void {
    this.formregister=this.fb.group({
      firstName:this.fb.control(""),
      lastName:this.fb.control(""),
      email:this.fb.control(""),
      password:this.fb.control(""),
      repeatpassword:this.fb.control("")



    })
  }

    handleregister(): void{

  const firstName=this.formregister.get("firstName")?.value
  const lastName=this.formregister.get("lastName")?.value

  const email=this.formregister.get("email")?.value
  const password=this.formregister.get("password")?.value
  const repeatpassword=this.formregister.get("repeatpassword")?.value

  const registrationData: Register = this.formregister.value; // Use the Register interface here

  this.authservice.register(registrationData).subscribe({
    next: (response) => {
      console.log('register successful', response);
    },
    error: (error) => {
      console.error('register error', error);
    },
    
    
  });



    }


  }

