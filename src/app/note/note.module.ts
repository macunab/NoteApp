import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { HomeComponent } from './home/home.component';
import { NoteRoutingModule } from './note-routing.module';
import { ListComponent } from './list/list.component';



@NgModule({
  declarations: [
    HomeComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NoteRoutingModule
  ]
})
export class NoteModule { }
