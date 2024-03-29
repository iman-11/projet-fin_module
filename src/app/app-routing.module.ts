import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectionComponent } from './section/section.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfilComponent } from './profil/profil.component';
import{AppointmentComponent} from './appointment/appointment.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FilterDoctorComponent } from './filter-doctor/filter-doctor.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { Test1Component } from './test1/test1.component';
import { TestComponent } from './test/test.component';
import { DoctorsectionComponent } from './doctorsection/doctorsection.component';
import { RendezVousComponent } from './rendez-vous/rendez-vous.component';
import { LoginpatientComponent } from './loginpatient/loginpatient.component';
import { ProfilfordoctorComponent } from './profilfordoctor/profilfordoctor.component';
import { PatientsComponent } from './patients/patients.component';
const routes: Routes = [




  

  {
    path: '',
    component: DashbordComponent,
    children: [

      { path: 'section', component: SectionComponent },

      { path: 'login', component: LoginComponent },
      { path: 'filter', component: FilterDoctorComponent },
      { path: 'doctor-profile', component: ProfilComponent },
      { path: 'test', component: TestComponent },
      { path: 'profil', component: ProfilComponent },
      { path: 'doctor', component: DoctorsectionComponent },

      { path: 'rendez', component: RendezVousComponent },

      { path: 'Appointment', component: AppointmentComponent },
      { path: 'patient', component: PatientsComponent },



      { path: 'loginpatiet', component: LoginpatientComponent },
      {path:'profildoc',component:ProfilfordoctorComponent},

      {path:'patients',component:PatientsComponent},





      





      

      

      { path: 'register', component: RegisterComponent },
      { path: 'contact', component: ContactComponent },
      { path: '', redirectTo: '/section', pathMatch: 'full' },

    ],
  },

 




      
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
