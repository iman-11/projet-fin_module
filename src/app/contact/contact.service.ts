import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Contact} from './contact'

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http:HttpClient) { }
  public saveContact(Contact: Contact):Observable<Contact>{
    return this.http.post<Contact>("http://localhost:8080/api/contacts/add",Contact);
  }
}

