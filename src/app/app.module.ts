import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatSelectModule } from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SectionComponent } from './section/section.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { TestComponent } from './test/test.component';
import { MatChipsModule } from '@angular/material/chips';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ProfilComponent } from './profil/profil.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PopupComponent } from './popup/popup.component';
import { FormsModule } from '@angular/forms';
import { AppointmentComponent } from './appointment/appointment.component';
import { FilterDoctorComponent } from './filter-doctor/filter-doctor.component';
import { Test1Component } from './test1/test1.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { DoctorsectionComponent } from './doctorsection/doctorsection.component';
import { RendezVousComponent } from './rendez-vous/rendez-vous.component';
import { LoginpatientComponent } from './loginpatient/loginpatient.component';
import { ProfilfordoctorComponent } from './profilfordoctor/profilfordoctor.component';
import { NgToastModule } from 'ng-angular-popup';
import { PatientsComponent } from './patients/patients.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DisplayqrComponent } from './displayqr/displayqr.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UpdateFormComponent } from './update-form/update-form.component';



@NgModule({
  declarations: [
          AppComponent,
    NavbarComponent,
    FooterComponent,
    SectionComponent,
    ContactComponent,
    
         LoginComponent,
         RegisterComponent,
         TestComponent,
         ProfilComponent,
         PopupComponent,
         AppointmentComponent,
         FilterDoctorComponent,
         Test1Component,
         DashbordComponent,
         DoctorsectionComponent,
         RendezVousComponent,
         LoginpatientComponent,
         ProfilfordoctorComponent,
         PatientsComponent,
         DisplayqrComponent,
         UpdateFormComponent,
 
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    HttpClientModule,
    MatChipsModule,
    BrowserAnimationsModule,
    MatInputModule,
    NgMultiSelectDropDownModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule,
    NgToastModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }) ,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
  ],
  providers: [],
  bootstrap: [AppComponent,]
})
export class AppModule { }
