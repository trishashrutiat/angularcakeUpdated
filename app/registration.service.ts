import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }
  registerUser(userData: any) {
    return this.http.post<any>('http://http://localhost:5000/insert', userData);
  }
}
