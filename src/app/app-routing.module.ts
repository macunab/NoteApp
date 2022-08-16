import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'notes',
    loadChildren: () => import('./note/note.module').then( m => m.NoteModule )
  },
  {
    path: '**',
    redirectTo: 'notes'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
