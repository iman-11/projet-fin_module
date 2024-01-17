import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
  import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { AppointmentService } from './appointment.service';
  import { ActivatedRoute } from '@angular/router';
  import { ServiceService } from '../service.service';
  import { formatDate } from '@angular/common';
  import { format, addDays } from 'date-fns';
  @Component({
    selector: 'app-appointment',
    templateUrl: './appointment.component.html',
    styleUrls: ['./appointment.component.css'],
  })
  export class AppointmentComponent implements OnInit {
    showMoreAppointments: boolean = false;
    currentWeekIndex: number = 0;

    postalCodes: { [key: string]: string } | undefined;
    currentStep = 0;
    appointmentForm: FormGroup;
    selectedDisease: any;
    userData: any = {};
    showSuccessMessage = false;
    availableSlots: any[] = [];
    visibleAppointments = 5;
    selectedDay: { jour: string; timeSlots: any[] } | null = null;
  showAllAppointments = false;
  selectedTimeSlot: string | null = null;
  doctorId: string | null = null;
  days: { date: Date, dayWithMonth: string }[] = [];
  appointmentHours: string[] = [];
  selectedHours: FormArray | undefined;
  dateRendezVous: string | null = null;
 

    constructor(private formBuilder: FormBuilder, private appointmentService: AppointmentService,private route: ActivatedRoute,private service: ServiceService,private cdr: ChangeDetectorRef) {
      this.appointmentForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        sexe: ['', Validators.required],
        phone: ['', Validators.required],
        dateNaissance: ['', Validators.required],
        dateRendezVous: [''],
        adresse: ['', Validators.required],
        maladie: ['', Validators.required],
        longueur: [''],
        poids: [''],
        ville: ['', Validators.required],
        zipCode: [''],
        appointmentType: ['', Validators.required],
        owner: ['', Validators.required],
        email:['', Validators.required],
         idDoctor:['',Validators.required],
        id_patient:['',Validators.required],
        status: ['', Validators.required],
        image: ['' ],
    
        
      
      });


      this.userData = {};

      this.loadDays();
      this.initializeAppointmentHours();
      this.selectedHours = this.formBuilder.array([]);
  
    }
    
    
    ngOnInit(): void {
      this.loadPostalCodes();
    
    
      this.route.queryParams.subscribe((params) => {
        console.log('Route params:', params);

        // Check if id is available in the route parameters
        if (params['id']) {
          // Update the doctorId in the component
          this.doctorId = params['id'];
          console.log('Updated doctorId in component:', this.doctorId);

          // Fetch the doctor details
        
        }
      });     
        
    
        console.log('Doctor ID from URL:', this.doctorId);
    
        this.appointmentForm.get('owner')?.valueChanges.subscribe((selectedValue) => {
          console.log('Selected Owner:', selectedValue);
          this.appointmentForm.patchValue({
            id_patient: sessionStorage.getItem('userId'),
          });
        });  
    
        if (this.doctorId) {
          this.appointmentForm.get('idDoctor')?.setValue(this.doctorId);
          console.log('ID_Doctor in Form:', this.appointmentForm.get('idDoctor')?.value);

        }
    
  
    }
    


  isSelectedSlot(hour: string): boolean {
    return this.selectedTimeSlot === hour;
  }
 
  
updateDateRendezVous(selectedDay: { date: Date, dayWithMonth: string }, selectedTime: string): void {
  const formattedDate = selectedDay.date.toISOString(); // ou autre format de date approprié
  const dateTimeString = `${formattedDate} ${selectedTime}`;
  this.dateRendezVous = dateTimeString;
}
initializeAppointmentHours(): void {
  // Start and end times
  const startTime = 10;
  const endTime = 18;

  // Loop to generate hours
  for (let i = startTime; i <= endTime; i++) {
    const hourString = i < 10 ? `0${i}:00` : `${i}:00`;
    this.appointmentHours.push(hourString);
  }
}
  loadDays(): void {
    const currentDate = new Date();
    const endOfWeek = new Date();
    endOfWeek.setDate(currentDate.getDate() + 300);

    while (currentDate <= endOfWeek) {
      const dayWithMonth = format(currentDate, 'EEEE dd MMMM');
      this.days.push({ date: new Date(currentDate), dayWithMonth });
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  seeMoreAppointments(): void {
    this.visibleAppointments += 5;
  }

  toggleAppointments(): void {
    this.showAllAppointments = !this.showAllAppointments;
 
    if (!this.showAllAppointments) {
      this.currentWeekIndex += 1;
      if (this.currentWeekIndex >= this.getNumberOfWeeks()) {
        this.currentWeekIndex = 0; // Revenir à la première semaine si on a atteint la fin
      }
    }
  }
  getNumberOfWeeks(): number {
    const weekSize = 7;
    return Math.ceil((this.days.length - 2) / weekSize) + 1; // Ajout de 1 pour la semaine actuelle
  }

  getSelectedHoursControl(hour: string) {
    return this.formBuilder.control(false);
  }


  onTimeSlotClick(hour: string, selectedDay: { date: Date, dayWithMonth: string }): void {
    console.log('Selected Time Slot:', hour, 'on', selectedDay.dayWithMonth);
    this.updateDateRendezVous(selectedDay, hour);
    this.selectedTimeSlot = hour;
  
    // Ajoutez ici l'appel à la fonction updateDateRendezVous
    this.updateDateRendezVous(selectedDay, hour);
  }
  
  
  

  


  setConsultation(type: 'Yes' | 'No'): void {
    if (type === 'Yes') {
      this.appointmentForm.get('status')?.setValue('Yes');
    } else {
      this.appointmentForm.get('status')?.setValue('No');
    }
    this.nextStep();

  }


  onImageUpload(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.appointmentForm.get('image')?.setValue(file); 
    }
  }
  onSubmit(): void {
      // Vous pouvez ajuster la condition pour ne permettre l'enregistrement qu'à partir d'une certaine étape
      if (this.appointmentForm.valid && this.dateRendezVous && this.currentStep >= 7) {
        const appointmentData = { ...this.appointmentForm.value, dateRendezVous: this.dateRendezVous };
        console.log('Données du formulaire :', appointmentData);
    
        this.appointmentService.createAppointment(appointmentData).subscribe(
          (response) => {
            console.log('Rendez-vous créé avec succès :', response);
            this.showSuccessMessage = true;
            this.appointmentForm.reset();
          },
          (error) => {
            console.error('Erreur lors de la création du rendez-vous', error);
          }
        );
      } else {
        console.log('Veuillez remplir tous les champs requis et sélectionner une date de rendez-vous valide.');
      }
    }
    
  


  
    
    nextStep(): void {
      if (this.currentStep < 7) {
        this.currentStep++;
      }
    }

    previousStep(): void {
      if (this.currentStep > 0) {
        this.currentStep--;
      }
    }

    loadPostalCodes(): void {
      this.appointmentService.getPostalCodes().subscribe(
        (data) => {
          this.postalCodes = data;
        },
        (error) => {
          console.error('Error fetching postal codes', error);
        }
      );
    }

    getPostalCodeKeys(): string[] {
      return this.postalCodes ? Object.keys(this.postalCodes) : [];
    }

    getPostalCodeCities(): string[] {
      return this.postalCodes ? Object.keys(this.postalCodes) : [];
    }

  
    setAppointmentType(type: 'call' | 'Face-to-face'): void {
      if (type === 'call') {
        this.appointmentForm.get('appointmentType')?.setValue('Call');
      } else {
        this.appointmentForm.get('appointmentType')?.setValue('Face-to-face');
      }
      this.nextStep();
    }
    

    onSave(): void {
      if (this.appointmentForm.valid) {
        this.onSubmit(); 
      } else {
        console.log('Please fill in all required fields.');
      }
    }
    
  
    
    getVisibleDays(): { date: Date, dayWithMonth: string }[] {
      const weekSize = 5;
      const startIndex = (this.currentWeekIndex * weekSize) + 2; // Commencer à partir du 2 janvier
      const endIndex = startIndex + weekSize;
      return this.days.slice(startIndex, endIndex);
    }
    
    showPreviousWeek(): void {
      this.showAllAppointments = false;
      this.currentWeekIndex -= 1;
      if (this.currentWeekIndex < 0) {
        this.currentWeekIndex = this.getNumberOfWeeks() - 1; // Revenir à la dernière semaine si on a atteint le début
      }
    }
    
    showNextWeek(): void {
      this.showAllAppointments = false;
      this.currentWeekIndex += 1;
      if (this.currentWeekIndex >= this.getNumberOfWeeks()) {
        this.currentWeekIndex = 0; // Revenir à la première semaine si on a atteint la fin
      }
    }

    
  }