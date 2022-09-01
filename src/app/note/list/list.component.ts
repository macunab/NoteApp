import { Component, OnInit } from '@angular/core';
import { Category } from '../categories/add-category.component';

export interface Note {
  id?: string;
  title: string;
  content: string;
  createAt: string;
  fav: boolean;
  category?: Category;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: []
})
export class ListComponent implements OnInit {

  notes: Array<Note> = [
    {
      title: 'Nota 1',
      content: 'Contenido de nota 1',
      createAt: '13/07/2021',
      fav: false,
      category: {
        name: 'Programacion',
        color: 'color-1'
      }
    },
    {
      title: 'Nota 2',
      content: 'Contenido de nota 2',
      createAt: '17/08/2021',
      fav: true,
      category: {
        name: 'Otros',
        color: 'color-6'
      }
    },
    {
      title: 'Nota 3',
      content: '',
      createAt: '21/08/2021',
      fav: false
    }
  ]
  defaultColor: string = 'note-grey';
  checked: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  selectNote(){
    console.log(`The note selected is: 100`);
  }

  favouriteClick(note: Note) {
    console.log('Se selecciono una nota como favorita...' + this.checked);
  }

  getCategoryColorClass(note: Note) {
    let classList = '';
    if(note.category){
      classList = 'note-color ' + note.category.color;
    } else {
      classList = 'note-color note-grey';
    }
      return classList;
  }

}
