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

  
  login(email: string, password: string) {
    const url: string = `${this.baseUrl}`;
    const body = { email, password };
    return this.http.post<DataResponse<null>>(url, body)
      .pipe(
        tap(
          // SAVE TOKEN in local storage
        ),
        map( res => res.ok),
        catchError(error => of(error.ok))
      )
  }

  register(user: User) {

  }

  loadToken() {

  }

  tokenValidation(): Observable<boolean> {
    return of(true);
  }

  // TODO google auth, https redirect?
  
}
