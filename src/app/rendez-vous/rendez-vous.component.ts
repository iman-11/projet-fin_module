import { Component } from '@angular/core';
import { Appointment } from '../appointment/appointment';
import { AppointmentService } from '../appointment/appointment.service';
import { ServiceService } from '../service.service';
import { NgToastService } from 'ng-angular-popup';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-rendez-vous',
  templateUrl: './rendez-vous.component.html',
  styleUrls: ['./rendez-vous.component.css']
})
export class RendezVousComponent {
 

  imageUrl: string | undefined;



  userid:any=sessionStorage.getItem('userId')

  appointments: Appointment[] = [];
  selectedAppointment: Appointment | undefined;
  results: any;


  constructor(private appointmentService: AppointmentService,      private http: HttpClient,
     private authservice: ServiceService,
    private toast: NgToastService
) {

  
} 

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
    console.log('Appointment accepted:', appointment);
    const message = `Dear ${appointment.firstName} ${appointment.lastName},\n\n` +
      `We are pleased to inform you that your appointment scheduled for ${appointment.dateRendezVous} has been accepted.\n\n` +
      `Thank you for choosing our service.\n\nBest regards,\nThe Appointment Team`;

    this.sendMail(
      appointment.email,
      [appointment.email],
      'Appointment Accepted',
      message
    );

    // Update the decision on the client side without waiting for the service call
    appointment.decision = 'accept';
    console.log('idapp',appointment.id)
    // Update the decision on the server side
    this.updateDecision(appointment.id, 'Accepted');
    

    // Remove the appointment from the appointments array
    this.appointments = this.appointments.filter(a => a.id !== appointment.id);
  }

  rejectAppointment(appointment: Appointment) {
    console.log('Appointment rejected:', appointment);
    const message = `Dear ${appointment.firstName} ${appointment.lastName},\n\n` +
      `We regret to inform you that your appointment scheduled for ${appointment.dateRendezVous} has been rejected.\n\n` +
      `If you have any questions, please contact us.\n\nBest regards,\nThe Appointment Team`;

    this.sendMail(
      appointment.email,
      [appointment.email],
      'Appointment Rejected',
      message
    );

    // Update the decision on the client side without waiting for the service call
    appointment.decision = 'reject';

    // Update the decision on the server side
    this.updateDecision(appointment.id, 'Rejected');

    // Remove the appointment from the appointments array
    this.appointments = this.appointments.filter(a => a.id !== appointment.id);
  }

  // ... (your existing code)


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
    this.downloadImage(); // Call the method to download the patient's image

  }


  showSuccess() {
    this.toast.success({
      detail: "SUCCESS",
      summary: 'Appointement Accepted',
      duration: 5000  // Provide the duration as a number (milliseconds)
    });
  }
  showError() {
    this.toast.error({
      detail: "ERROR",
      summary: 'Appointement Rejected ',
      sticky: true  // Set sticky to true for a sticky duration
    });
  }

  
    
  
  downloadImage(): void {
    if (!this.selectedAppointment || !this.selectedAppointment.id_patient) {
      return;
    }
  
    // Use HttpClient to download the image from the server
    this.http
      .get(`http://localhost:8080/image/download/${this.selectedAppointment.id_patient}`, {
        responseType: 'arraybuffer', // Set the response type to arraybuffer
        observe: 'events', // Observe progress events
      })
      .subscribe(
        (event) => {
          if (event.type === HttpEventType.DownloadProgress) {
            // Handle download progress if needed
            // const percentDone = Math.round((100 * event.loaded) / event.total);
            // console.log(`File is ${percentDone}% downloaded.`);
          } else if (event.type === HttpEventType.Response) {
            // Download completed successfully
            const arrayBuffer = event.body as ArrayBuffer;
            const blob = new Blob([arrayBuffer], { type: 'image/png' }); // Adjust the type as needed
            this.imageUrl = URL.createObjectURL(blob);
          }
        },
        (error) => {
          console.error('Error downloading image', error);
        }
      );
    console.log('Downloading image for user ID:', this.selectedAppointment.id_patient);
  }
  


}

