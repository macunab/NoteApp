import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DataResponse } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PasswordValidatorService implements AsyncValidator {

  private baseUrl: string = environment.baseUrl;
  private headers = new HttpHeaders()
    .set('x-token', localStorage.getItem('token') || '')

  constructor(private http: HttpClient) { }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const url: string = `${this.baseUrl}/auth/password-verify`;
    const password = control.value;

    return this.http.post<DataResponse<null>>(url, { password }, { headers: this.headers })
      .pipe(
        map( res => {
          return (res.ok)
           ? null
           : { notMatches: true };
        })
      )
  }
}
