import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  
  login() {
    
  }
  
  register() {
    
  }

  loadToken() {

  }

  tokenValidation(): Observable<boolean> {
    return of(true);
  }
}
