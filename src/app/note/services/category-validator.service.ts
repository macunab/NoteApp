import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { Observable, of, map } from 'rxjs';
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataResponse } from "src/app/authentication/interfaces/interfaces";



@Injectable({
    providedIn: 'root'
})
export class CategoryValidatorService implements AsyncValidator {

    baseUrl: string = environment.baseUrl;
    private headers = new HttpHeaders()
    .set('x-token', localStorage.getItem('token') || '')

    constructor(private http: HttpClient) {}

    validate(control: AbstractControl): Observable<ValidationErrors | null> {
        const url: string = `${this.baseUrl}/categories/verify-name`;
        const name: string = control.value;
        return this.http.post<DataResponse<null>>(url, { name }, { headers: this.headers})
            .pipe(
                map( resp => {
                    return (resp.ok)
                        ? null
                        : { existName: true }
                })
            );
    }
}