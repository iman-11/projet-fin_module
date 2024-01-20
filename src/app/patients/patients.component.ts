import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from '../service.service';
import { Appointment } from '../appointment/appointment';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { UpdateFormComponent } from '../update-form/update-form.component';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class PatientsComponent {
  userid: string = sessionStorage.getItem('userId')!;
  selectedAppointment: Appointment | undefined;

  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'phone',
    'sexe',
    'dateNaissance',
    'adresse',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  imageUrl: string | undefined;

  constructor(
    private _dialog: MatDialog,
    private service:ServiceService, private http: HttpClient,
    private toast: NgToastService

   
  ) {}

  ngOnInit(): void {
    this.getEmployeeList();
  }

  // openAddEditEmpForm() {
  //   const dialogRef = this._dialog.open(EmpAddEditComponent);
  //   dialogRef.afterClosed().subscribe({
  //     next: (val) => {
  //       if (val) {
  //         this.getEmployeeList();
  //       }
  //     },
  //   });
  // }


  getEmployeeList() {
    this.service.getDoctorAppointments(this.userid).subscribe({
      next: (res) => {
        
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  viewAppointmentDetails(appointment: Appointment) {
    this.selectedAppointment = appointment;
    this.downloadImage()
  }
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.dataSource.filter = filterValue;
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  

  // deleteEmployee(id: number) {
  //   this._empService.deleteEmployee(id).subscribe({
  //     next: (res) => {
  //       this._coreService.openSnackBar('Employee deleted!', 'done');
  //       this.getEmployeeList();
  //     },
  //     error: console.log,
  //   });
  // }

  // openEditForm(data: any) {
  //   const dialogRef = this._dialog.open(EmpAddEditComponent, {
  //     data,
  //   });

  //   dialogRef.afterClosed().subscribe({
  //     next: (val) => {
  //       if (val) {
  //         this.getEmployeeList();
  //       }
  //     },
  //   });
  // }

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


  openUpdateForm(appointment: Appointment): void {
    const dialogRef = this._dialog.open(UpdateFormComponent, {
      width: '600px', // Set the width of the dialog as needed
      data: appointment, // Pass the selected appointment data to the dialog
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Handle the result if needed
        this.getEmployeeList();
      }
    });
  }
  



  deleteAppointment(id: string) {
    this.service.deleteAppointment(id).subscribe(
      () => {
        // Update data in the frontend (optional)
        this.deleteDataLocally(id);

        // Optionally, you can display a success message or handle other UI-related tasks
      },
      (error) => {
        // Handle errors, display error messages, etc.
      }
    );
  }

 
  deleteDataLocally(id: string) {
    // Get the underlying array from the MatTableDataSource
    const data = this.dataSource.data;
  
    // Find the index of the item with the specified id
    const index = data.findIndex(appointment => appointment.id === id);
  
    // If the item is found, remove it from the array
    if (index !== -1) {
      data.splice(index, 1);
  
      // Update the MatTableDataSource.data to reflect the changes
      this.dataSource.data = [...data];
    }
 

  }
  showSuccess() {
    this.toast.success({
      detail: "SUCCESS",
      summary: 'Appointement Updated',
      duration: 5000  // Provide the duration as a number (milliseconds)
    });
  }
  showError() {
    this.toast.error({
      detail: "ERROR",
      summary: 'Appointement Deleted ',
      sticky: true  // Set sticky to true for a sticky duration
    });
  }

}
