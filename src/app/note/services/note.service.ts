import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Note } from '../interfaces/interfaces';
import { DataResponse } from 'src/app/authentication/interfaces/interfaces';
import { map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllNotes() {
    const url: string = `${this.baseUrl}/notes`;
    return this.http.get<DataResponse<Note>>(url)
      .pipe(
        map( res => res.data ),
        catchError( error => of(error.ok))
      );
  }

  createNote(note: Note) {

  }

  updateNote() {

  }

  deleteNote(id: string) {

  }
}
