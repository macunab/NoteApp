import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { AddCategoryComponent } from './add-category.component';

interface Category {
  id?: string;
  name: string;
  color: string;
}

@Component({
  selector: 'app-categorys',
  templateUrl: './categorys.component.html',
  styles: [
    `
    .content {
      margin-top: 2em;
    }

    .dot {
      height: 15px;
      width: 15px;
      border-radius: 50%;
      display: inline-block;
      margin-right: 10px;
    }

    @media only screen and (min-width: 1000px) {
    .content {
        margin-right: 150px;
        margin-left: 150px;
    }
}
    `
  ]
})
export class CategorysComponent implements OnInit {

  categories: Array<Category> = [
    {
      id: '1',
      name: 'Programacion',
      color: 'color-1'
    },
    {
      id: '2',
      name: 'Compras',
      color: 'color-4'
    },
    {
      id: '3',
      name: 'Otros',
      color: 'color-2'
    }
  ];

  constructor( public dialog: MatDialog ) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '350px'
    });
    dialogRef.afterClosed().subscribe( result => {
      console.log('dialog was closed');
    });
  }

  selectCategory(category: Category) {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '350px',
      data: category
    });
    /*dialogRef.afterClosed().subscribe( result => {
      console.log('dialog was closed');
    });*/
  }

  delete(category: Category) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { type: 'Categoria', id: category.name }
    });
    dialogRef.afterClosed().subscribe( result => {
      if(result.ok){
        console.log('La categoria se ha eliminado...');
      }
    })
  }

}
