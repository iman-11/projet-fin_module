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
  resetPasswordForm!: FormGroup;

  // Propriété pour contrôler l'affichage du formulaire de réinitialisation
  showResetPasswordForm = false;

  public totpForm!: FormGroup;


  formlogin !:FormGroup;
  constructor(private fb:FormBuilder,private authservice:ServiceService,private router: Router,
    private spinner: NgxSpinnerService
    
    ){
      
    }
    
  ngOnInit(): void {




    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmationPassword: ['', Validators.required],
    });
  
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
            this.authservice.getdoctor(sessionStorage.getItem('userId')).subscribe({
              next: (doctorInfo) => {
                if (
                  doctorInfo &&
                  (doctorInfo.formations === null ||
                    doctorInfo.experiences === null ||
                    doctorInfo.diplomas === null ||
                    doctorInfo.speciality === null ||
                    doctorInfo.address === null ||
                    doctorInfo.telephone === null ||
                    doctorInfo.date_naissance === null ||
                    doctorInfo.gender === null)
                ) {
                  // Redirect to /test if any of the fields are null
                  this.router.navigate(['/test']);
                } else {
                  // Redirect to /doctor if all fields are present
                  this.router.navigate(['/doctor']);
                }
              },
              // Handle errors as needed
            });          }
          this.spinner.hide()
        }
      });
  }

  showResetPassword() {
    // Réinitialiser le formulaire de réinitialisation
    this.resetPasswordForm.reset();
    // Afficher le formulaire en mettant à jour la propriété
    this.showResetPasswordForm = true;
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

          this.router.navigate(['/doctor']);
        }
      });
  }
  


  submitResetPassword() {
    // Récupérer les valeurs du formulaire de réinitialisation
    const email = this.resetPasswordForm.value.email;
    const currentPassword = this.resetPasswordForm.value.currentPassword;
    const newPassword = this.resetPasswordForm.value.newPassword;
    const confirmationPassword = this.resetPasswordForm.value.confirmationPassword;

    // Construire l'objet changepassword
    const changepassword = {
      email: email,
      currentPassword: currentPassword,
      newPassword: newPassword,
      confirmationPassword: confirmationPassword
    };

    // Appeler la méthode changepassword du service
    this.authservice.changepassword(changepassword).subscribe({
      next: (response) => {
        // Gérer la réponse du service, par exemple, afficher un message de succès
        console.log('Password changed successfully', response);
        // Cacher le formulaire après soumission
        this.showResetPasswordForm = false;
      },
      error: (error) => {
        // Gérer les erreurs, par exemple, afficher un message d'erreur
        console.error('Error changing password', error);
      }
    });
  }

  cancelResetPassword() {
    // Masquer le formulaire en mettant à jour la propriété
    this.showResetPasswordForm = false;
  }
}
