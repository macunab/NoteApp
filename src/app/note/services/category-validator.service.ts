import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { Observable, of, map } from 'rxjs';
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';
import { DataResponse } from "src/app/authentication/interfaces/interfaces";



@Injectable({
    providedIn: 'root'
})
export class CategoryValidatorService implements AsyncValidator {

    baseUrl: string = environment.baseUrl;

    constructor(private http: HttpClient) {}

    validate(control: AbstractControl): Observable<ValidationErrors | null> {
        const url: string = `${this.baseUrl}/categories/verify-name`
        const name: string = control.value;
        return this.http.post<DataResponse<null>>(url, { name })
            .pipe(
                map( resp => {
                    return (resp.ok)
                        ? null
                        : { existName: true }
                })
            );
    }
}