import { HttpClient } from '@angular/common/http';
import { Component, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { gsap } from 'gsap';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-doctorsection',
  templateUrl: './doctorsection.component.html',
  styleUrls: ['./doctorsection.component.css']
})
export class DoctorsectionComponent {
  firstName: any;
  lastName: any;

  

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private authservice: ServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private el: ElementRef,


 ) {}
 
  ngOnInit(): void {
    this.slider();
    this.loadDoctorDetails()
  }


  slider(): void {
    gsap.to('.slider', { height: "100%", duration: 0.5, ease: 'power4.out' });
    gsap.to('.slider', { width: "100%", duration: 0, delay: 0.5, ease: 'power4.inOut' });
    gsap.to('.slider', { width: "1.4em", left: '0', right: 'initial', delay: 1, ease: 'power4.inOut', onComplete: this.rtl });
    gsap.to('.slider', { width: "1.4em", height: '0%', duration: 0.1, delay: '1.5', ease: 'linear' });

    // Add your Left To Right animation here if needed
  }

  rtl(): void {
    gsap.to('.slider__text', { opacity: '1', duration: 0, delay: '0' });
  }


  loadDoctorDetails(): void {
    const userId = sessionStorage.getItem('userId');
  
    if (userId) {
      this.authservice.getdoctor(userId).subscribe(
        (doctorData) => {
          console.log('Doctor Data:', doctorData); // Check the received data
          this.firstName = doctorData.firstname;
          this.lastName = doctorData.lastname;
        },
        (error) => {
          console.error('Error fetching doctor details:', error);
        }
      );
    } else {
      console.error('User ID not found in session storage.');
    }
  }


  

}
