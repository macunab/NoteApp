import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsNoteService, ServiceData } from 'src/app/forms-note.service';

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
/*
.input-paper {
  background-color: transparent;
  border: 0px;
  outline: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  color:gray;
  cursor:default;
  border-bottom: 1px solid #C2CDFF;
  margin-bottom: 10px;
}

.input-height {
  height: 30px;
}*/
  `
  ]
})
export class CreateNoteComponent implements OnInit {

  noteForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    content: [''],
    category: ['']
  });
  
  title: string = 'Nueva Nota:'
  updateData: ServiceData = { ok: false };

  constructor(private fb: FormBuilder, private dataService: FormsNoteService) {}

  ngOnInit(): void {
    this.updateData = this.dataService.getUpdateData();
    if(this.updateData.ok){
      this.title = 'Editar Nota:'
      this.noteForm.patchValue({
        title: this.updateData.data!.title,
        content: this.updateData.data!.content,
        category: this.updateData.data!.category! ? this.updateData.data!.category!.name : ''
      })
    }
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
