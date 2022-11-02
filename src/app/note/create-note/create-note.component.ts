import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsNoteService, ServiceData } from 'src/app/forms-note.service';
import { Category, Note } from '../interfaces/interfaces';
import { CategoriesService } from '../services/categories.service';
import { NoteService } from '../services/note.service';

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

  categories: Array<Category> = [];
  
  title: string = 'Nueva Nota:'
  updateData: ServiceData = { ok: false };
  loadingSaveData: boolean = false;

  constructor(private fb: FormBuilder, private dataService: FormsNoteService,
      private noteService: NoteService, private categoryService: CategoriesService,
      private router: Router) {}

  ngOnInit(): void {
    this.categoryService.getAllCategories()
      .subscribe(resp => {
        this.categories = resp;
      })
    this.updateData = this.dataService.getUpdateData();
    if(this.updateData.ok){
      console.log(this.updateData.data?.category?.name);
      this.title = 'Editar Nota:'
      this.noteForm.patchValue({
        title: this.updateData.data!.title,
        content: this.updateData.data!.content,
        category: this.updateData.data!.category ? this.updateData.data!.category._id : ''
      })
    }
  }

  saveNote(): void {
    console.log(this.noteForm.value);
    const note: Note = {
      ...this.noteForm.value,
    };
    note.category = this.categories.find(val => val._id == note.category);
    if(this.updateData.ok) {
      note._id = this.updateData.data?._id;
      this.noteService.updateNote(note)
        .subscribe( resp => {
         if(resp) {
          this.router.navigateByUrl('view/all');
         }
        });
      return;
    }
    this.noteService.createNote(note)
      .subscribe(resp => {
        if(resp) {
          this.router.navigateByUrl('view/all');
        }
      })
  }

}
