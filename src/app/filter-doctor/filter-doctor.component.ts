import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-filter-doctor',
  templateUrl: './filter-doctor.component.html',
  styleUrls: ['./filter-doctor.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class FilterDoctorComponent {

  selectedSpecialty: string = ''; 
  results1: any[] = [];




  ngOnInit() {
    this.route.queryParams.subscribe(params => {
       this.selectedSpecialty = params['specialty'];
      // Faites quelque chose avec la valeur de la spécialité, par exemple, l'afficher dans la console
      console.log('Specialty from URL:', this.selectedSpecialty);
      this.loadDoctorsAndImages();

    });
  }


  doctors!: any[];

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private authservice: ServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService

 ) {}

  searchText = '';
  results: any[] = [];






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
    this.spinner.show()

    if (!this.selectedSpecialty) {
      console.error('Selected specialty is not defined.');
      return;
    }
  
    this.authservice.getalldoctor().subscribe(
      (data) => {

        // Download images for each doctor
        this.results1 = data.filter((doctor) => {
          const isSelectedSpecialty = doctor.speciality === this.selectedSpecialty;
          if (isSelectedSpecialty) {
            this.downloadImage1(doctor.id);
          }
          return isSelectedSpecialty;
        });
        this.spinner.hide()
      },
      (error) => {
        console.error('Error loading doctors', error);
        this.spinner.hide()

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

  



  checkAuthentication(doctorId: string): void {
    // Check if the user is authenticated
    const isAuthenticated = this.authservice.isAuthenticated(); // Implement this method in ServiceService

    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      this.router.navigate(['/loginpatiet'], { queryParams: { id: doctorId } });


    }else{
      this.router.navigate(['/Appointment'], { queryParams: { id: doctorId } });

    }
  
  }


}
