import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TestComponent {
  
  personalDetails!: FormGroup;
  addressDetails!: FormGroup;
  educationalDetails!: FormGroup;
  personal_step = false;
  address_step = false;
  education_step = false;
  step = 1;

specialites = [
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
langues: string[] = ['Arabe','Français', 'Anglais', 'Espagnol', 'Allemand'];
monFormulaire!: FormGroup;



  constructor(private formBuilder: FormBuilder,private authservice:ServiceService) { }

  ngOnInit() {
 
    this.personalDetails = this.formBuilder.group({
      Adresse: ['', Validators.required],
      téléphone: ['', Validators.required],
      naissance: ['', Validators.required],
      gender: ['', Validators.required],
    });
   

    this.addressDetails = this.formBuilder.group({
    
      diplomes: this.formBuilder.array([]),
      formations: this.formBuilder.array([]),
    });

    this.educationalDetails = this.formBuilder.group({
      year: ['', Validators.required],
      speciality: ['', Validators.required],
      institute: ['', Validators.required],
      experiences:this.formBuilder.array([]),
      specialite: ['', Validators.required],
      langues: ['', Validators.required] // Utilisez un tableau pour la sélection multiple

    });

  }

  get personal() { return this.personalDetails.controls; }

  get address() { return this.addressDetails.controls; }

  get education() { return this.educationalDetails.controls; }

  get diplomes() {
    return (this.addressDetails.get('diplomes') as FormArray).controls;
  }
  get experiences() {
    return (this.educationalDetails.get('experiences') as FormArray).controls;
  }

  get formations() {
    return (this.addressDetails.get('formations') as FormArray).controls;
  }

  adddiplome() {
    const diplomesArray = this.addressDetails.get('diplomes') as FormArray;
  
    if (diplomesArray.length === 0 || !this.isDiplomeEmpty(diplomesArray.at(diplomesArray.length - 1) as FormGroup)) {
      const diplome = this.formBuilder.group({
        year: ['', Validators.required],
        speciality: ['', Validators.required],
        institute: ['', Validators.required],
      });
  
      diplomesArray.push(diplome);
        console.log('Diplomes:', diplomesArray.value);

    }
  }
  
  private isDiplomeEmpty(diplomeGroup: FormGroup): boolean {
    const values = Object.values(diplomeGroup.controls);
    return values.every(value => !value.value);
  }
  

  removediplome(index: number) {
    (this.addressDetails.get('diplomes') as FormArray).removeAt(index);
  }
  addexperience(){
    (this.educationalDetails.get('experiences') as FormArray).push(
      this.formBuilder.group({
        year: ['', Validators.required],
        titre: ['', Validators.required],
        lieu: ['', Validators.required],
      })
    );
  }

  removexperience(index: number) {
    (this.educationalDetails.get('experiences') as FormArray).removeAt(index);
  }
  addFormation() {
    (this.addressDetails.get('formations') as FormArray).push(
      this.formBuilder.group({
        year: ['', Validators.required],
        speciality: ['', Validators.required],
        institute: ['', Validators.required],
      })
    );
  }

  removeFormation(index: number) {
    (this.addressDetails.get('formations') as FormArray).removeAt(index);
  }

  

  next() {
    if (this.step == 1) {
      this.personal_step = true;
      this.step++;
    } else if (this.step == 2) {
      this.address_step = true;
      this.step++;
    } else if (this.step == 3) {
      this.education_step = true;
      this.step++;
    }
  }
  previous() {
    this.step--;

    if (this.step == 1) {
      this.address_step = false;
    }
    if (this.step == 2) {
      this.education_step = false;
    }
  }

  submit() {
    // Build the doctorData object to send to the backend
    const doctorData = {
      formations: this.addressDetails.value.formations,
      experiences: this.educationalDetails.value.experiences,
      diplomas: this.addressDetails.value.diplomes,
  
      speciality: this.educationalDetails.value.specialite,
      address: this.personalDetails.value.Adresse,
      telephone: this.personalDetails.value.téléphone,
      date_naissance: this.personalDetails.value.naissance,
      gender: this.personalDetails.value.gender,
      langues:this.educationalDetails.value.langues
    };
  
    const userId = sessionStorage.getItem('userId') ?? 'defaultUserId';

// Call the updateDoctor method from the ServiceService
this.authservice.updateDoctor(userId, doctorData).subscribe({
  next: (response: any) => {
    if (response instanceof Object) {
      console.log('Doctor updated successfully:', response);
    } else {
      console.error('Unexpected response format:', response);
    }
  },
  error: (error: any) => {
    console.error('Error updating doctor:', error);
  },
});

  }

  
  
    }
  
  


















