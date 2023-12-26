import { Component, ViewEncapsulation } from '@angular/core';
import { ContactService } from './contact.service';
import { Contact } from './contact';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  
})
export class ContactComponent {
  newContact: Contact = {
    nom: '',
    email: '',
    message: '',
    id: '',
  };

  constructor(private contactService: ContactService) {}

  onSubmit(): void {
    this.contactService.saveContact(this.newContact).subscribe(
      (response) => {
        console.log('Contact added successfully:', response);
  
        // Vous pouvez accéder aux données de réponse si nécessaire
        // response contiendra les données renvoyées par le serveur
  
        // Clear individual properties instead of reassigning the whole object
        this.newContact.nom = '';
        this.newContact.email = '';
        this.newContact.message = '';
        this.newContact.id = '';
      },
      (error) => {
        // Si le statut est 201, considérez-le comme un succès
        if (error.status === 201) {
          console.log('Contact added successfully:', error);
          
          // Clear individual properties instead of reassigning the whole object
          this.newContact.nom = '';
          this.newContact.email = '';
          this.newContact.message = '';
          this.newContact.id = '';
        } else {
          console.error('Error adding contact:', error);
        }
      }
    );
  }
}
