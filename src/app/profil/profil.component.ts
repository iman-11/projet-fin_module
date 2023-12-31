import { Component, ViewEncapsulation,HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { ServiceService } from '../service.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfilComponent {



  doctorId:string|null=null;

  isFixed = false;
  imageUrl: any;
  doctor!: any;
  constructor(private http: HttpClient, private dialog: MatDialog,private authservice: ServiceService,private router1: Router,

    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
 

    ) {

    this.downloadImage();
  }
  ngOnInit(): void {
    this.spinner.show()
    
    // Get the doctorId from the route parameters
    this.route.queryParams.subscribe((params) => {
      console.log('Route params1:', params);
  
      // Check if id1 is available in the route parameters
      if (params['id1']) {
        // Update the doctorId in the component
        this.doctorId = params['id1'];
        console.log('Updated doctorId in component:', this.doctorId);
  
        // Fetch the doctor details
        this.authservice.getdoctor(this.doctorId).subscribe(
          (data) => {
            console.log('Doctor data:', data);
            this.doctor = data;
  
            // After getting the doctor's information, download the image
            this.downloadImage();
            this.spinner.hide()
          },
          (error) => {
            console.error('Error getting doctor data:', error);
            this.spinner.hide()

          }
        );
      }
    });
  }
  





  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    this.isFixed = window.scrollY > 220; // Changez 100 selon votre besoin
  }
  uploadImage(formData: FormData): void {
    if (!this.doctorId) {
      return;
    }

    // Append user ID to the form data
    formData.append('userId', this.doctorId);

    this.http.post<any>(`http://localhost:8080/image/${this.doctorId}`, formData).subscribe(
      (response) => {
        // Image upload successful
        const imageUrl = response.imageUrl;
        const fileName = response.fileName;

        // Update the image URL in your model
        // Make sure your model has an imageUrl property
        this.imageUrl = imageUrl;

        // After upload, download the image again
        this.downloadImage(); // Use the backend's file name
      },
      (error) => {
        console.error('Error uploading image', error);
      }
    );
  }

  downloadImage(): void {
    if (!this.doctorId) {
      return;
    }
  
    // Use HttpClient to download the image from the server
    this.http
      .get(`http://localhost:8080/image/download/${this.doctorId}`, {
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
      console.log('Downloading image for user ID:', this.doctorId);

  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      // Use HttpClient to upload the image to the server
      const formData = new FormData();
      formData.append('image', file);

      this.uploadImage(formData);
    }
  }

  

  Openpopup() {
    this.dialog.open(PopupComponent, {
      width: '60%',
      height: '400px',
    });
  }


  openProfileModal() {
    // Use Bootstrap modal API to show the modal
    const modalElement = document.getElementById('exampleModal1');
  
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    } else {
      console.error('Modal element not found');
    }
  }
  getRoleFromSessionStorage(): string | null {
    return (
      (JSON.parse(sessionStorage.getItem('roles') || '[]')[0]) || null
    );
  }
  checkAuthentication(): void {
    // Check if the user is authenticated
    const isAuthenticated = this.authservice.isAuthenticated(); // Implement this method in ServiceService

    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      this.router1.navigate(['/loginpatiet'], { queryParams: { id: this.doctorId } });


    }else{
      this.router1.navigate(['/Appointment'], { queryParams: { id: this.doctorId } });

    }
  }
  


}




