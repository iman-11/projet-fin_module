import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.css']
})
export class Test1Component {
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
  passionType: string = 'PASSION';
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

  onSubmit(): void {
    // Handle form submission if necessary
  }

  selectResult(result: any): void {
    console.log('Selected result:', result);
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

}
