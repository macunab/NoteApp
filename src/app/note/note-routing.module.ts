import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateNoteComponent } from './create-note/create-note.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  { path: '',
  component: HomeComponent,
  children: [
    { path: '', component: ListComponent },
    { path: 'create', component: CreateNoteComponent },
    { path: '**', redirectTo: 'categories' }
  ]
}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoteRoutingModule { }
