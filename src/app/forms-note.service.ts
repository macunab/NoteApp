import { Injectable } from '@angular/core';
import { Note } from './note/interfaces/interfaces';

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
