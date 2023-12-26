import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
  animations: [
    trigger('cardAnimation', [
      state('visible', style({ opacity: 1, transform: 'translateX(0)' })),
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(100%)' }),
        animate('300ms ease-out')
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class AppointmentComponent {
  showHiddenCard = false;

  // Method to show the third card
  showThirdCard(): void {
    this.showHiddenCard = true;
  }

  showAppointmentCard(appointmentType: string) {
    // Add logic to handle the selected appointment type
    console.log('Selected appointment type:', appointmentType);
    // You may add further logic based on the selected appointment type

    // Now, show the hidden card with the consultation date form
    this.showHiddenCard = true;
  }

  goBack() {
    // Hide the hidden card when going back
    this.showHiddenCard = false;
    // Add any additional logic you may need when going back
  }
  currentPage: number = 1;
  nextPage() {
    this.currentPage++;
  }

  previousPage() {
    this.currentPage--;
  }

  submitForm() {
    // Logic to submit the form (to be implemented)
    console.log('Form submitted successfully');
  }
}

