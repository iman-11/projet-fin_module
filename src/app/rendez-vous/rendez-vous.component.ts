import { Component } from '@angular/core';
import { Appointment } from '../appointment/appointment';
import { AppointmentService } from '../appointment/appointment.service';

@Component({
  selector: 'app-rendez-vous',
  templateUrl: './rendez-vous.component.html',
  styleUrls: ['./rendez-vous.component.css']
})
export class RendezVousComponent {

  userid:any=sessionStorage.getItem('userId')

  appointments: Appointment[] = [];

  constructor(private appointmentService: AppointmentService) {} // Inject your service

  ngOnInit() {
    this.loadAppointments();
  }

  loadAppointments() {
    this.appointmentService.getAllAppointmentsDoctor(this.userid).subscribe(
      (data: Appointment[]) => {
        this.appointments = data;
        console.log('Appointments:', this.appointments);
      },
      (error) => {
        console.error('Error fetching appointments:', error);
      }
    );
  }

}
