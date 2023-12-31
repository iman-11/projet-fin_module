import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from './appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'http://localhost:8080/api/'; 
  private baseUrl = 'http://localhost:8080/api/v1/users'

  constructor(private http: HttpClient) {}

  getPostalCodes(): Observable<any> {
    return this.http.get<any>(this.apiUrl+'CodePostal/all');

  }

  getAllAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}rendezvous/all`);
  }

  
 getAllAppointmentsDoctor(userId: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.baseUrl}/appointments/${userId}`);
  }




  public createAppointment(appointment: Appointment):Observable<Appointment>{
    return this.http.post<Appointment>("http://localhost:8080/api/rendezvous/add",appointment);
  }

  getHorairesByUserIdAndDate(userId: string, date: string): Observable<any[]> {
    const url = `${this.baseUrl}/${userId}/horaires`;
    const params = new HttpParams().set('date', date); // Supposons que votre backend attende un paramètre 'date'
  
    return this.http.get<any[]>(url, { params });
  }

}

