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

  private baseUrl1 = 'http://localhost:8080/api/rendezvous'

 getAllAppointmentsDoctor(userId: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.baseUrl1}/doctor/${userId}`);
  }
  private apiUrl3 = 'http://localhost:8080/api/rendezvous/updateDecision';

  updateAppointmentDecision(id: string, decision: string): Observable<any> {
    const url = `${this.apiUrl3}/${id}`;
    const body = { decision: decision };
    return this.http.put(url, body);
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

