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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ProfilComponent } from './profil/profil.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PopupComponent } from './popup/popup.component';
import { ContactService } from './contact/contact.service';
import { FormsModule } from '@angular/forms';
import { AppointmentComponent } from './appointment/appointment.component';
import { FilterDoctorComponent } from './filter-doctor/filter-doctor.component';
import { Test1Component } from './test1/test1.component';



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
 
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatChipsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    NgMultiSelectDropDownModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule,
    
    
  ],
  providers: [],
  bootstrap: [AppComponent,]
})
export class AppModule { }
