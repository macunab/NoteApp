import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Note } from '../interfaces/interfaces';
import { DataResponse } from 'src/app/authentication/interfaces/interfaces';
import { map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private baseUrl: string = environment.baseUrl;
  private headers = new HttpHeaders()
    .set('x-token', localStorage.getItem('token') || '');

  constructor(private http: HttpClient) {}

  getAllNotes() {
    const url: string = `${this.baseUrl}/notes`;
    return this.http.get<DataResponse<Note>>(url, { headers: this.headers })
      .pipe(
        map( res => res.data ),
        catchError( error => of(error.ok))
      );
  }

  createNote(note: Note) {
    const url: string = `${this.baseUrl}/notes`;
    return this.http.post<DataResponse<null>>(url, note, { headers: this.headers })
      .pipe(
        map( res => res.ok),
        catchError(error => of(error.ok))
      )
  }

  updateNote(note: Note) {
    const url: string = `${this.baseUrl}/notes/${note._id}`;
    const { title, content, category } = note;
    return this.http.put<DataResponse<null>>(url, {title, content, category},
      {headers: this.headers})
      .pipe(
        map( res => res.ok),
        catchError(error => of(error.ok))
      )
  }

  deleteNote(id: string) {
    const url: string = `${this.baseUrl}/notes/${id}`;
    return this.http.delete<DataResponse<null>>(url, { headers: this.headers })
      .pipe(
        map( res => res.ok),
        catchError( error => of(error.ok))
      )
  }

  checkFavouriteOption(id: string, fav: boolean) {
    const url: string = `${this.baseUrl}/notes/${id}/${fav}`;
    return this.http.get<DataResponse<null>>(url, { headers: this.headers})
      .pipe(
        map(res => res.ok),
        catchError(error => of(error.ok))
      )
  }
}
