import { Component, ViewEncapsulation,HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfilComponent {
  isFixed = false;
  imageUrl: any;
  userId=sessionStorage.getItem('userId')
  constructor(private http: HttpClient, private dialog: MatDialog) {

    console.log('User ID:', this.userId);
    this.downloadImage();
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    this.isFixed = window.scrollY > 220; // Changez 100 selon votre besoin
  }
  uploadImage(formData: FormData): void {
    if (!this.userId) {
      console.error('User ID not found in session storage');
      return;
    }

    // Append user ID to the form data
    formData.append('userId', this.userId);

    this.http.post<any>(`http://localhost:8080/image/${this.userId}`, formData).subscribe(
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
    if (!this.userId) {
      console.error('User ID not found in session storage');
      return;
    }
  
    // Use HttpClient to download the image from the server
    this.http
      .get(`http://localhost:8080/image/download/${this.userId}`, {
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
      console.log('Downloading image for user ID:', this.userId);

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
}
