import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css'],
  encapsulation:ViewEncapsulation.None

})
export class SectionComponent {

  oussama!: HTMLElement | null;
  oussama1!: HTMLElement | null;

  

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private authservice: ServiceService,
    private router: Router
  ) {
    document.addEventListener('DOMContentLoaded', () => {
      this.oussama = document.getElementById('och');
      this.oussama1 = document.getElementById('ouch');

      if (this.oussama && this.oussama1) {
        setInterval(() => this.change(), 2500);
      }
    });
  }
  jobType: string = 'DOCTOR'; // Initial value for job type
  passionType: string = 'INTEREST';
  change() {
    if (this.jobType === 'DOCTOR') {
      this.jobType = 'HOSPITAL';
      this.passionType = 'SEARCH';
    } else {
      this.jobType = 'DOCTOR';
      this.passionType = 'INTEREST';
    }
  }


  searchText = '';
  results: any[] = [];

  search(): void {
    this.authservice.search(this.searchText).subscribe((data) => {
      this.results = data;

      // Download images for each result
      this.results.forEach((result) => {
        this.downloadImage(result.id);
      });

      console.log(this.results);

      
      
    });
  }



  selectResult(result: any): void {
  
    // Check if doctorId is available
    if (result.id) {
      this.router.navigate(['/doctor-profile'], { queryParams: { id: result.id } });
      console.log('Selected id:', result.id);

    } else {
      console.error('Doctor ID is not available');
    }
  }

  downloadImage(userId: string): void {
    if (!userId) {
      console.error('User ID not provided');
      return;
    }
  
    this.http
      .get(`http://localhost:8080/image/download/${userId}`, {
        responseType: 'arraybuffer',
        observe: 'events',
      })
      .subscribe(
        (event) => {
          if (event.type === HttpEventType.Response) {
            const arrayBuffer = event.body as ArrayBuffer;
            const blob = new Blob([arrayBuffer], { type: 'image/png' });
  
            // Assign the image URL directly to the user in the results array
            const userIndex = this.results.findIndex((user) => user.id === userId);
            if (userIndex !== -1) {
              this.results[userIndex].imageUrl = URL.createObjectURL(blob);
            }
          }
        },
        (error) => {
          console.error(`Error downloading image for user ID ${userId}`, error);
        }
      );
  }
  onSubmit(event: Event) {
    event.preventDefault(); // Prevent the default form submission
    // Rest of your onSubmit logic
}

  
}
