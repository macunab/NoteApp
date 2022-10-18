import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap, map, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataResponse, User } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  saveToken(response: DataResponse<null>) {
    if(response.ok) {
      localStorage.setItem('token', response.token!);
    }
  }

  
  login(email: string, password: string) {
    const url: string = `${this.baseUrl}/login`;
    const body = { email, password };
    return this.http.post<DataResponse<null>>(url, body)
      .pipe(
        tap( res => {
          this.saveToken(res);
        }),
        map( res => res.ok),
        catchError(error => of(error.ok))
      )
  }

  register(user: User) {
    const url: string = `${ this.baseUrl }/register`;
    return this.http.post<DataResponse<null>>(url, user)
      .pipe(
        map( res => res.ok ),
        catchError(error => of(error.ok))
      )
  }

  loadToken() {

  }

  tokenValidation(): Observable<boolean> {
    return of(true);
  }

  // TODO google auth, https redirect?
  
}
