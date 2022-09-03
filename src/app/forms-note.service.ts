import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Note } from './note/list/list.component';

export interface ServiceData {
  ok: boolean;
  data?: Note;
}

@Injectable({
  providedIn: 'root'
})
export class FormsNoteService {

  private dataParam: ServiceData = { ok: false };

  sendData(data: ServiceData) {
    this.dataParam = data;
  }

  getUpdateData() {
    return this.dataParam;
  }
}
