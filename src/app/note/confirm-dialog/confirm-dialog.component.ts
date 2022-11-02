import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from '../interfaces/interfaces';

export interface DeleteItem {
  type: string;
  name: string;
  id: string;
}
@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styles: [
  ]
})
export class ConfirmDialogComponent implements OnInit {

  title: string = '';
  content: string = ''
  id: string = '';

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
      @Inject(MAT_DIALOG_DATA) data: DeleteItem) { 
        this.title = `Delete ${data.type}`;
        this.content = `Are you sure you want to delete the ${data.type}: ${data.name}?`;
        this.id = data.id!;
      }

  ngOnInit(): void {
  }

  confirm() {
    this.dialogRef.close({ ok: true, id: this.id});
  }

  cancel() {
    this.dialogRef.close({ ok: false });
  }

}
