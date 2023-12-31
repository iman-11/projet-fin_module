import { Component } from '@angular/core';
import { Appointment } from '../appointment/appointment';
import { AppointmentService } from '../appointment/appointment.service';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-rendez-vous',
  templateUrl: './rendez-vous.component.html',
  styleUrls: ['./rendez-vous.component.css']
})
export class RendezVousComponent {
 




  userid:any=sessionStorage.getItem('userId')

  appointments: Appointment[] = [];
  selectedAppointment: Appointment | undefined;


  constructor(private appointmentService: AppointmentService,    private authservice: ServiceService,
) {} // Inject your service

  ngOnInit() {
    this.loadAppointments();
  }

  updateDecision(id: string, decision: string): void {
    this.appointmentService.updateAppointmentDecision(id, decision).subscribe(
      response => {
        console.log('Mise à jour réussie :', response);
        // Ajoutez ici la logique de gestion de la réponse
      },
      error => {
        console.error('Erreur lors de la mise à jour :', error);
        // Ajoutez ici la logique de gestion de l'erreur
      }
    );
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
 

  acceptAppointment(appointment: Appointment) {
    
    // Perform actions related to accepting the appointment
    // You can also call sendMail method here with the appropriate parameters
    console.log('Appointment accepted:', appointment);


    // Example: Send email
    this.sendMail(
      appointment.email,
      [appointment.email],
      'Appointment Accepted',
      'Rendez-vous accepted'
    );


    this.appointmentService.updateAppointmentDecision(appointment.id, 'accept').subscribe(() => {
      // Mark the action as taken for this appointment
      appointment.isActionTaken = true;
    });
  

    
  }

  rejectAppointment(appointment: Appointment) {
    // Perform actions related to rejecting the appointment
    // You can also call sendMail method here with the appropriate parameters
    console.log('Appointment rejected:', appointment);

    // Example: Send email
    this.sendMail(
      appointment.email,
      [appointment.email],
      'Appointment Rejected',
      'Rendez-vous rejected'
    );
    appointment.isActionTaken = true;

    this.appointmentService.updateAppointmentDecision(appointment.id, 'reject').subscribe(() => {
      // Mark the action as taken for this appointment
      appointment.isActionTaken = true;
    });

  }

  sendMail(to: string, cc: string[], subject: string, body: string) {
    // Call your sendMail method from the service
    this.authservice.sendMail([], to, cc, subject, body).subscribe(
      (response) => {
        console.log('Email sent successfully:', response);
      },
      (error) => {
        console.error('Error sending email:', error);
      }
    );
  }
  

  viewAppointmentDetails(appointment: Appointment) {
    this.selectedAppointment = appointment;
  }


  
    
  

}

