import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { HomeComponent } from './home/home.component';
import { NoteRoutingModule } from './note-routing.module';
import { ListComponent } from './list/list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CreateNoteComponent } from './create-note/create-note.component';




@NgModule({
  declarations: [
    HomeComponent,
    ListComponent,
    CreateNoteComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    NoteRoutingModule
  ]
})
export class NoteModule { }
