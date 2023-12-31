import { Component, ElementRef, HostListener, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpcialityService } from '../spciality/spciality.service';
import { Spciality } from '../spciality/spciality';
import { ServiceService } from '../service.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css',],

  
  
})
export class NavbarComponent {
  imageUrl: string | null = null; // Declare the imageUrl property

  doctorId=sessionStorage.getItem('userId');

  showSpecialtyList = false;
  specialties = [
    "Cardiologie",
    "Chirurgien-dentiste",
    "Gynécologue obstétricien",
    "Médecin généraliste",
    "Pédiatre",
    "Ophtalmologue",
    "Dermatologue et vénérologue",
    "Ostéopathe",
    "Masseur-kinésithérapeute",
    "Opticien-lunetier",
    "Pédicure-podologue",
    "Sage-femme",
    "ORL",
    "Allergologue",
    "Chirurgien urologue",
    "Rhumatologue",
    "Stomatologue",
    "Endocrinologue",
    "Chirurgien orthopédiste et traumatologue",
    "Diététicien",
    "Psychologue"
  ];
  spciality: any;
  firstName: any;
  lastName: any;

  

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private authservice: ServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private el: ElementRef,
    private SpcialityService: SpcialityService,


 ) {}
 

  toggleSpecialtyList() {
    this.showSpecialtyList = !this.showSpecialtyList;

    // Si la liste n'a pas encore été chargée, chargez-la
    if (this.showSpecialtyList && this.specialties.length === 0) {
      this.loadSpecialties();
    }
  }

  private loadSpecialties() {
    this.SpcialityService.getAllSpecialty().subscribe(
      (specialties: Spciality[]) => {
        this.specialties = specialties.map(specialtyItem => specialtyItem.nom);
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des spécialités :', error);
      }
    );
  }

  // Écouteur d'événements pour le clic en dehors de la liste
  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    // Vérifiez si l'élément cliqué n'est pas à l'intérieur du composant
    if (!this.el.nativeElement.contains(event.target)) {
      // Cachez la liste si elle est ouverte
      if (this.showSpecialtyList) {
        this.toggleSpecialtyList();
      }
    }
  }

  selectSpecialty(specialty: string) {
  
    // Utilisez le router pour naviguer vers la composante 'filter' avec le paramètre 'specialty'
    this.router.navigate(['/filter'], { queryParams: { specialty: specialty } });
  
    this.toggleSpecialtyList();
  }
  getRoleFromSessionStorage(): string | null {
    return (JSON.parse(sessionStorage.getItem('roles') || '[]')[0]) || null;
  }


  selectedSpecialty: string = ''; 
  results: any[] = [];




  ngOnInit() {
    this.downloadImage();
    this.loadDoctorDetails();

  }


 







  downloadImage(): void {
    const userId = sessionStorage.getItem('userId');
  
   
  
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
  
            // Set the imageUrl directly for the logged-in user
            this.imageUrl = URL.createObjectURL(blob);
          }
        },
        (error) => {
          console.error(`Error downloading image for user ID ${userId}`, error);
        }
      );
  }
  

  loadDoctorDetails(): void {
    const userId = sessionStorage.getItem('userId');
  
    if (userId) {
      this.authservice.getdoctor(userId).subscribe(
        (doctorData) => {
          console.log('Doctor Data:', doctorData); // Check the received data
          this.firstName = doctorData.firstname;
          this.lastName = doctorData.lastname;
        },
        (error) => {
          console.error('Error fetching doctor details:', error);
        }
      );
    }
  }

  logout() {
    // Clear session storage
    sessionStorage.clear();

    // Redirect to the section page
    this.router.navigate(['/section']);
  }

  

  
  
  
  
  




  
  

  

}
