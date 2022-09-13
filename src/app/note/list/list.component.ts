import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsNoteService } from 'src/app/forms-note.service';
import { Category } from '../categories/add-category.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

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

  filterBy: string | null = '';
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

  viewNotes: Array<Note> = [];
  
  defaultColor: string = 'note-grey';
  checked: boolean = false;

  constructor( private router: Router, private dataService: FormsNoteService,
      public dialog: MatDialog, private route: ActivatedRoute ) { }

  ngOnInit(): void {    
    this.route.paramMap
      .subscribe( params => {
        this.viewNotes = this.notes;
        this.filterBy = params.get('filterBy');
        if( this.filterBy === 'favs') {
          this.viewNotes = this.notes.filter( note => note.fav );
        }
        if( this.filterBy === 'trash') {
          // get notes from the db whit the delete flag
        }
        console.log(this.filterBy);
      })
  }

  selectNote(note: Note){
    console.log(`The note selected is: 100`);
    this.dataService.sendData({ok: true, data: note});
    this.router.navigateByUrl('/notes/create');
  }

  favouriteClick(note: Note) {
    console.log('Se selecciono una nota como favorita...' + this.checked);
  }

  addNoteButton() {
    this.dataService.sendData({ ok: false });
    this.router.navigateByUrl('/notes/create');
  }

  searchNote(key: Event) {
    const searchKey = (key.target as HTMLInputElement).value.toLowerCase();
    if(searchKey.length >= 0){
      this.viewNotes = this.notes;
      this.viewNotes = this.viewNotes.filter(q => q.title.toLowerCase().indexOf(searchKey) >= 0);
    } 
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

  deleteNote(note: Note) {
    console.log(note);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { type: 'nota', id: note.title }
    });
    dialogRef.afterClosed().subscribe( result => {
      // Delete note
      console.log('Nota eliminada');
    });
  }

}
