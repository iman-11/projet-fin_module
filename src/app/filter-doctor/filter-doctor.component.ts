import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-filter-doctor',
  templateUrl: './filter-doctor.component.html',
  styleUrls: ['./filter-doctor.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class FilterDoctorComponent {
  selectedSpecialty!: any;
  results1: any[] = [];


  ngOnInit(): void {
    this.loadDoctorsAndImages();

    this.authservice.selectedSpecialty$.subscribe((specialty) => {
      this.selectedSpecialty = specialty;
      console.log('Inside subscription:', this.selectedSpecialty);
      this.loadDoctorsAndImages();
      // Other actions based on the selected specialty
    });
  }


  doctors!: any[];

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private authservice: ServiceService,
    private router: Router
 ) {}

  searchText = '';
  results: any[] = [];



  onSubmit(): void {
    // Handle form submission if necessary
  }

  selectResult(result: any): void {
  }

  downloadImage(userId: string): void {
    if (!userId) {
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

  downloadImage1(userId: string): void {
    if (!userId) {
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
            const userIndex = this.results1.findIndex((user) => user.id === userId);
            if (userIndex !== -1) {
              
              this.results1[userIndex].imageUrl = URL.createObjectURL(blob);


            }
          }
        },
        (error) => {
          console.error(`Error downloading image for user ID ${userId}`, error);
        }
      );
  }
  
  loadDoctorsAndImages(): void {
    this.authservice.getalldoctor().subscribe(
      (data) => {
     
          // Filter doctors based on the selected specialty
          this.results1 = data.filter((doctor1) => doctor1.speciality === this.selectedSpecialty);
  
          // Download images for each doctor
          this.results1.forEach((doctor) => {
  
            this.downloadImage1(doctor.id);
          });
        
      },
      (error) => {
        console.error('Error loading doctors', error);
      }
    );
  }
  
  




  
  search(): void {
    this.authservice.search(this.searchText).subscribe((data) => {
      this.results = data;

      // Download images for each result
      this.results.forEach((result) => {

        this.downloadImage(result.id);
        console.log(result.imageUrl)
      });


      
      
    });
  }


}
