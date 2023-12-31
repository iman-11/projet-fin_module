export interface Appointment {
    id:string
    firstName: string;
    lastName: string;
    phone: string;
    sexe: string;
    dateNaissance: string;
    adresse: string;
    ville: string;
    dateRendezVous: Date;
    idDoctor: string;
    longueur: number;
    poids: number;
    maladie: string;
    zipCode:string;
    appointmentType: 'Face-to-face' | 'Call';
    owner: string;
    email:string;
    id_patient:string;
    decision: string;
}
