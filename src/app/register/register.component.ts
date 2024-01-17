import { Component } from '@angular/core';
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
})
export class RegisterComponent {
  constructor(
    private fb: FormBuilder,
    private authservice: ServiceService,
    private router: Router
  ) {}
  message = '';
  formregister!: FormGroup;
  authresponse: AuthenticationResponse = {};
  registrationData: Register = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatpassword: '',
  };
  otpCode = '';

  ngOnInit(): void {
    this.formregister = this.fb.group({
      firstname: this.fb.control(''),
      lastname: this.fb.control(''),
      email: this.fb.control(''),
      password: this.fb.control(''),
      repeatpassword: this.fb.control(''),
      role: this.fb.control(''),
      mfaEnabled: this.fb.control(false),
    });
    this.formregister
      .get('mfaEnabled')
      ?.valueChanges.subscribe((value) => {
        console.log('mfaenabled value changed:', value);
      });
  }

  handleregister() {
    this.message = '';

    this.registrationData = this.formregister.value;

    this.authservice.register(this.registrationData).subscribe({
      next: (response) => {
        if (response) {
          this.authresponse = response;
          this.authservice.loadprofile1(response);

          if (this.formregister.value.mfaEnabled) {
            // If 2FA is enabled, verify the code before navigating
            this.verifyTfa();
          } else {
            // If 2FA is not enabled, navigate directly based on the role
            this.navigateBasedOnRole();
          }
        } else {
          // inform the user
          this.message =
            'Account created successfully\nYou will be redirected to the Login page in 3 seconds';
          setTimeout(() => {
            this.authservice.loadprofile1(response);
            this.navigateBasedOnRole();
          }, 3000);
        }
      },
    });
  }

  onUserTypeChange(event: Event): void {
    const userType = (event.target as HTMLSelectElement).value;
    this.formregister.patchValue({ role: userType });
  }

  verifyTfa() {
    this.message = '';
    const verifyRequest: VerificationRequest = {
      email: this.registrationData.email,
      code: this.otpCode,
    };

    this.authservice.verifyCode(verifyRequest).subscribe({
      next: (response) => {
        this.message =
          'Account verification successful. Redirecting...';
        setTimeout(() => {
          this.navigateBasedOnRole();
        }, 3000);
      },
      error: (error) => {
        console.error('Verification error:', error);
        // Handle the error as needed
        this.message = 'Verification failed. Please try again.';
      },
    });
  }

  navigateBasedOnRole() {
    if (this.formregister.value.role === 'DOCTOR') {
      this.router.navigate(['/doctor']);
    } else if (this.formregister.value.role === 'PATIENT') {
      this.router.navigate(['/Appointment']);
    }
  }
}
