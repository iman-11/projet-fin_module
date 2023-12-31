import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from './appointment.service';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service.service';
import { formatDate } from '@angular/common';
import { Day } from './day';
@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
})
export class AppointmentComponent implements OnInit {
  postalCodes: { [key: string]: string } | undefined;
  currentStep = 0;
  appointmentForm: FormGroup;
  selectedDisease: any;
  userData: any = {};
  showSuccessMessage = false;
  availableSlots: any[] = [];
  days: { date: Date; dayWithMonth: string }[] = [];
  visibleAppointments = 5;
  selectedDay: { jour: string; timeSlots: any[] } | null = null;
showAllAppointments = false;
dateRendezVous: string | null = null;
selectedTimeSlot: string | null = null;
doctorId: string | null = null;




  constructor(private formBuilder: FormBuilder, private appointmentService: AppointmentService,private route: ActivatedRoute,private service: ServiceService,private cdr: ChangeDetectorRef) {
    this.appointmentForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      sexe: ['', Validators.required],
      phone: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      adresse: ['', Validators.required],
      maladie: ['', Validators.required],
      longueur: ['', Validators.required],
      poids: ['', Validators.required],
      ville: ['', Validators.required],
      zipCode: ['', Validators.required],
      appointmentType: ['', Validators.required],
      owner: ['', Validators.required],
      email:['', Validators.required],
      id_Doctor:['',Validators.required],
      id_patient:['',Validators.required],
     
      selectedHours: this.formBuilder.array([]),
     
    });


    this.userData = {};
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
        this.appointmentForm.get('id_Doctor')?.setValue(this.doctorId);
        console.log('ID_Doctor in Form:', this.appointmentForm.get('id_Doctor')?.value);
        const currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
        this.loadAvailableSlots();
      }
  
 
  }
  
  get selectedHoursFormArray() {
    return this.appointmentForm.get('selectedHours') as FormArray;
  }
  
  getSelectedHoursControl(slot: string) {
    return this.formBuilder.control(false); // Initialisez le contrôle avec la valeur par défaut selon vos besoins
  }
// generateIdPatient(): string {
//  return `patient_${new Date().getTime()}`;
// }

// Dans votre composant
// ...






isSelectedSlot(slot: string): boolean {
  return this.selectedTimeSlot === slot;
}

onTimeSlotClick(slot: string): void {
  console.log('Selected Time Slot:', slot);
  this.updateDateRendezVous(slot);
  this.selectedTimeSlot = slot;
}

updateDateRendezVous(slot: string): void {
  // const selectedDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  this.dateRendezVous = `${slot}`;
  console.log('Updated Date RendezVous:', this.dateRendezVous);
}

loadAvailableSlots(): void {
  if (this.doctorId) {
    const currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    this.appointmentService.getHorairesByUserIdAndDate(this.doctorId, currentDate).subscribe(
      (slots) => {
        console.log('Available Slots:', slots);
        this.availableSlots = slots;
      },
      (error) => {
        console.error('Error fetching available slots', error);
      }
    );
  }
}

toggleTimeSlots(day: Day): void {
  console.log('Selected Day:', this.selectedDay);

  // Check if selectedDay is defined and has the same day string representation
  if (this.selectedDay && JSON.stringify(this.selectedDay) === JSON.stringify(day)) {
    this.selectedDay = null; // Deselect the day
  } else {
    const heureDepart = day.heure_depart || ''; // Use an empty string if it's null
    const heureArrivee = day.heure_arrivee || ''; // Use an empty string if it's null

    this.selectedDay = { ...day, timeSlots: this.generateTimeSlots(heureDepart, heureArrivee) };
  }

  this.cdr.detectChanges(); // Run change detection
}



isSelectedDay(day: { jour: string; timeSlots: any[] }): boolean {
  if (this.selectedDay) {
    return this.selectedDay.jour === day.jour;
  }
  return false;
}



generateTimeSlots(departureTime: string, arrivalTime: string): string[] {
  const departureHour = parseInt(departureTime.split(':')[0], 10);
  const arrivalHour = parseInt(arrivalTime.split(':')[0], 10);
  const timeSlots: string[] = [];

  for (let i = departureHour; i <= arrivalHour; i++) {
    timeSlots.push(`${i}:00`);
  }

  return timeSlots;
}






  onSubmit(): void {
    if (this.appointmentForm.valid) {
      const appointmentData = this.appointmentForm.value;
      
      // Assurez-vous que selectedTimeSlot est défini avant de créer le rendez-vous
      if (this.selectedTimeSlot) {
        appointmentData.selectedTimeSlot = this.selectedTimeSlot;
      }
  
      // Ajoutez la dateRendezVous à appointmentData
      if (this.dateRendezVous) {
        appointmentData.dateRendezVous = this.dateRendezVous;
      }
  
      console.log('Form Data:', appointmentData);
  
      this.appointmentService.createAppointment(appointmentData).subscribe(
        (response) => {
          console.log('Appointment created successfully:', response);
          this.showSuccessMessage = true;
          this.appointmentForm.reset();
          // ... Reste du code pour bloquer le créneau horaire si nécessaire
        },
        (error) => {
          console.error('Error creating appointment', error);
        }
      );
    }
  }
  
  
  nextStep(): void {
    if (this.currentStep < 5) {
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

 
  
  

  seeMoreAppointments(): void {
    this.visibleAppointments += 5;
  }

  toggleAppointments(): void {
    this.showAllAppointments = !this.showAllAppointments;
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
      this.onSubmit(); // Vous pouvez appeler votre méthode onSubmit ici si nécessaire
    } else {
      // Le formulaire n'est pas valide, affichez un message d'erreur
      console.log('Please fill in all required fields.');
    }
  }
 
  

  

  
}
