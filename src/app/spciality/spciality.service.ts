import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Spciality } from './spciality';
@Injectable({
  providedIn: 'root'
})
export class SpcialityService {
  constructor(private http:HttpClient) { }
 
  public getAllSpecialty(): Observable<Spciality[]> {
    return this.http.get<Spciality[]>("http://localhost:8080/api/speciality/all");
  }
}
