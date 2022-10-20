import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { DataResponse } from '../interfaces/interfaces';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator {

  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {

    const url: string = `${this.baseUrl}/auth/email-verify`;
    const email = control.value;
    return this.http.post<DataResponse<null>>(url, { email })
      .pipe(
        map(resp => {
          return (resp.ok)
            ? null
            : { existEmail: true };
        })
      );
  }
}
