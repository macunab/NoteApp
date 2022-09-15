import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TokenValidationGuard } from './guards/token-validation.guard';

const routes: Routes = [
  {
    path: 'notes',
    loadChildren: () => import('./note/note.module').then( m => m.NoteModule ),
    canActivate: [TokenValidationGuard],
    canLoad: [TokenValidationGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./authentication/authentication.module').then( m => m.AuthenticationModule )
  },
  {
    path: '**',
    redirectTo: 'notes/view/all'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
