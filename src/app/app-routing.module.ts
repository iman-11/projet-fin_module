import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectionComponent } from './section/section.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfilComponent } from './profil/profil.component';
import{AppointmentComponent} from './appointment/appointment.component';
const routes: Routes = [

  
  {path:'login',component:LoginComponent},
  {path:'profil',component:ProfilComponent},
  { path: 'Appointment', component: AppointmentComponent },





      
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
