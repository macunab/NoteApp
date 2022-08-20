import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styles: [`
  .note-form {
  min-width: 150px;
  max-width: 500px;
  margin-top: 2em;
  width: 100%;
}
  `
  ]
})
export class CreateNoteComponent implements OnInit {

  noteForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    content: [''],
    category: ['']
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  saveNote(): void {
    console.log(this.noteForm.value);
    const notaCompleta = {
      ...this.noteForm.value,
      categoria: 'lalala',
      estado: 10,
      favorito: false
    };
    console.log(`nota completa: ${JSON.stringify(notaCompleta)}`);
  }

}
