import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
      name: 'Programacion',
      color: 'color-1'
    },
    {
      name: 'Compras',
      color: 'color-4'
    },
    {
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
    console.log('Se selecciono una categoria para editar');
    console.log(category);
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '350px',
      data: category
    });
    dialogRef.afterClosed().subscribe( result => {
      console.log('dialog was closed');
    });
  }

  delete(category: Category) {
    console.log(category);
  }

}
