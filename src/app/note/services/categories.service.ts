import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DataResponse } from 'src/app/authentication/interfaces/interfaces';
import { catchError, map, of } from 'rxjs';
import { Category } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  //TODO headers for all functions, first complete auth service
  getAllCategories() {
    const url: string = `${this.baseUrl}/categories`
    return this.http.get<DataResponse<Category>>(url)
      .pipe(
        map( resp => resp.data),
        catchError(error => of(error.ok))
      );
  }

  createCategory(category: Category) {
    const url: string = `${this.baseUrl}/categories`;
    return this.http.post<DataResponse<null>>(url, category)
      .pipe(
        catchError(res => of(res.ok))
      );
  }

  deleteCategory(id: string) {
    const url: string = `${this.baseUrl}/categories/${id}`;
    return this.http.delete<DataResponse<null>>(url)
      .pipe(
        catchError(res => of(res.ok))
      );
  }

}
