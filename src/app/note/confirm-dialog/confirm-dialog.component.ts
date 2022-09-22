import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DeleteItem {
  type: string;
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

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
      @Inject(MAT_DIALOG_DATA) data: DeleteItem) { 
        this.title = `Delete ${data.type}`;
        this.content = `Are you sure you want to delete the ${data.type}: ${data.id}?`;
      }

  ngOnInit(): void {
  }

  confirm() {
    this.dialogRef.close({ ok: true });
  }

  cancel() {
    this.dialogRef.close({ ok: false });
  }

}
