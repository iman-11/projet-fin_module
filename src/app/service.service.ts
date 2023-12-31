import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Register } from './register/register';
import { jwtDecode } from 'jwt-decode';
import { AuthenticationResponse } from './register/authentication-response';
import { VerificationRequest } from './register/verification-request';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  
  private apiUrl = 'http://localhost:8080/api/v1/users'; // Replace with your actual backend API URL

 roles:any
 username:any;
 accesstoken!:string;
 user_id!:string;


  constructor(private http:HttpClient) { }


  login(email: string, password: string): Observable<any> {
    const requestBody = { email, password };

    return this.http.post<AuthenticationResponse>(`http://localhost:8080/api/v1/auth/authenticate`, requestBody);
  }

  register(requestbody: Register): Observable<any> {
    return this.http.post<AuthenticationResponse>('http://localhost:8080/api/v1/auth/register', requestbody);
  }


  updateDoctor(userId:string,doctorData: any): Observable<any> {
    // Implement the logic to send a PUT request to your backend
    return this.http.put(`${this.apiUrl}/${userId}`, doctorData);
  }
  loadprofile(data: any) {
    this.accesstoken = data['access_token'];  
    let jwtdecoder: any = jwtDecode(this.accesstoken);
  
    this.username = jwtdecoder.sub;
    this.roles = jwtdecoder.scope;
    this.user_id = jwtdecoder.userId;
  
    // Store information in sessionStorage
    sessionStorage.setItem('accessToken', this.accesstoken);
    sessionStorage.setItem('username', this.username);
    sessionStorage.setItem('roles', JSON.stringify(this.roles));
    sessionStorage.setItem('userId', this.user_id);
  }
  loadprofile1(data: any) {
    this.accesstoken = data['accessToken'];  
    let jwtdecoder: any = jwtDecode(this.accesstoken);
  
    this.username = jwtdecoder.sub;
    this.roles = jwtdecoder.scope;
    this.user_id = jwtdecoder.userId;
  
    // Store information in sessionStorage
    sessionStorage.setItem('accessToken', this.accesstoken);
    sessionStorage.setItem('username', this.username);
    sessionStorage.setItem('roles', JSON.stringify(this.roles));
    sessionStorage.setItem('userId', this.user_id);
  }


  private apiUrl1 = 'http://localhost:8080/api/v1/users/search';


  search(keyword: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl1}/${keyword}`);
  }
  private apiUrl2="http://localhost:8080/api/v1/users/alldoctor";

  getalldoctor():Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl2}`);
  }
  private selectedSpecialtySubject = new BehaviorSubject<string | null>(null);
  selectedSpecialty$ = this.selectedSpecialtySubject.asObservable();

  
  getdoctor(userid: any): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/v1/users/getdoctor/${userid}`);
  }
  private baseUrl = 'http://localhost:8080/api/v1/auth'

  verifyCode(verificationRequest: VerificationRequest) {
    return this.http.post<AuthenticationResponse>
    (`${this.baseUrl}/verify`, verificationRequest);
  }
  
 
  isAuthenticated(): boolean {
    // Check if the token is stored in sessionStorage or any other authentication logic
    // For example, you can use the presence of the access token as an indicator of authentication
    return sessionStorage.getItem('accessToken') !== null;
  }
  
}
