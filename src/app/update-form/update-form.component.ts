import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css']
})
export class UpdateFormComponent {
  updatedAppointment: any; // Define a property to store the updated appointment data

  constructor(
    private dialogRef: MatDialogRef<UpdateFormComponent>,
    private service: ServiceService,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Initialize the updatedAppointment property with the existing appointment data
    this.updatedAppointment = { ...data };
  }

  // Implement the update logic
  updateAppointment() {
    // Use the service method to update the appointment
    this.service.updateAppointment(this.data.id, this.updatedAppointment).subscribe(
      (result) => {
        // Handle the result if needed
        this.dialogRef.close(result);
      },
      (error) => {
        console.error('Error updating appointment', error);
        // Handle errors if needed
      }
    );
  }
}
