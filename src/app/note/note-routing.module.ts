import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategorysComponent } from './categorys/categorys.component';
import { CreateNoteComponent } from './create-note/create-note.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  { 
    path: '',
    component: HomeComponent,
    children: [
      { path: 'all', component: ListComponent },
      { path: 'create', component: CreateNoteComponent },
      { path: 'categories', component: CategorysComponent },
      { path: '**', redirectTo: 'all' }
    ]
   },
   {
    path: '**',
    redirectTo: ''
   }
    
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoteRoutingModule { }
