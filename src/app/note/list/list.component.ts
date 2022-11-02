import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsNoteService } from 'src/app/forms-note.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Note } from '../interfaces/interfaces';
import { NoteService } from '../services/note.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: []
})
export class ListComponent implements OnInit {

  filterBy: string | null = '';
  title: string = '';
  notes: Array<Note> = [
  ]

  viewNotes: Array<Note> = [];
  
  defaultColor: string = 'note-grey';
  checked: boolean = false;

  constructor( private router: Router, private dataService: FormsNoteService,
      public dialog: MatDialog, private route: ActivatedRoute,
      private noteService: NoteService ) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe( params => {
        this.filterBy = params.get('filterBy');
        this.title = 'Todas las notas:'
        this.noteService.getAllNotes()
      .subscribe(resp => {
        this.notes =  resp;
        console.log(this.notes)
        this.noteFilterImplementation();
      })
        
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
      this.noteFilterImplementation();
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
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { type: 'nota', name: note.title, id: note._id }
    });
    dialogRef.afterClosed().subscribe( result => {
      if(!result.ok){
        return;
      }
      this.noteService.deleteNote(result.id)
        .subscribe( resp => {
          if(resp) {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'A note has been deleted successfully',
              showConfirmButton: false,
              timer: 2500
            })
            return;
          }
          Swal.fire({
            title: 'An erro ocurred while trying delete a note',
            icon: 'error'
          });
        })
    });
  }

  // opt, many ifs, smell code --- no trash
  noteFilterImplementation() {
    this.viewNotes = this.notes;
    if( this.filterBy === 'favs') {
      this.viewNotes = this.notes.filter( note => note.fav );
      this.title = 'Notas favoritas:'
    }
    if( this.filterBy === 'trash') {
      // get notes from the db whit the delete flag or filter from the array
      this.title = 'Papelera:'
    }
    if( this.filterBy != 'all' && this.filterBy != 'favs' && this.filterBy != 'trash' ) {
      if(this.filterBy == 'no-category') {
        this.viewNotes = this.notes.filter( note => note.category == null)
        this.title = 'Sin Categoria:';
      } else {
        this.viewNotes = this.notes.filter( note => note.category?.name == this.filterBy)
        this.title = this.filterBy!;
      }
    }
  }

}
