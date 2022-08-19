import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateNoteComponent } from './create-note/create-note.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
    { path: '', component: ListComponent },
    { path: 'create', component: CreateNoteComponent },
    { path: '**', redirectTo: 'categories' }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoteRoutingModule { }
