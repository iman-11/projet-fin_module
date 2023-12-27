import { Component, ElementRef, HostListener, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SpcialityService } from '../spciality/spciality.service';
import { Spciality } from '../spciality/spciality';
import { ServiceService } from '../service.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css',],

  
  
})
export class NavbarComponent {
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

  constructor(
    private router: Router,
    private SpcialityService: SpcialityService,
    private el: ElementRef,
    private authservice: ServiceService,
  ) {}

  navigateToContact() {
    this.router.navigate(['/navbar/contact']);
  }

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

    this.authservice.setSelectedSpecialty(specialty);
    
    this.router.navigate(['/filter']); // <-- Update here

    this.toggleSpecialtyList();
  }


}
