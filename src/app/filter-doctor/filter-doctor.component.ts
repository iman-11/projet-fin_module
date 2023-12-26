import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-filter-doctor',
  templateUrl: './filter-doctor.component.html',
  styleUrls: ['./filter-doctor.component.css']
})
export class FilterDoctorComponent {

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private authservice: ServiceService,
    private router: Router
  ) {}

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
