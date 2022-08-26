import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { HomeComponent } from './home/home.component';
import { NoteRoutingModule } from './note-routing.module';
import { ListComponent } from './list/list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CreateNoteComponent } from './create-note/create-note.component';
import { CategorysComponent } from './categorys/categorys.component';
import { AddCategoryComponent } from './categorys/add-category.component';




@NgModule({
  declarations: [
    HomeComponent,
    ListComponent,
    CreateNoteComponent,
    CategorysComponent,
    AddCategoryComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    NoteRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class NoteModule { }
