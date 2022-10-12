import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { CategoriesService } from '../services/categories.service';
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
export class CategorysComponent  implements OnInit{

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

  constructor( public dialog: MatDialog, private categoriesService: CategoriesService ) { }

  ngOnInit(): void {
    this.categoriesService.getAllCategories()
      .subscribe( resp => {
        console.log( resp );
      })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '350px'
    });
  }

  selectCategory(category: Category) {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '350px',
      data: category
    });
  }

  delete(category: Category) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { type: 'Category', id: category.name }
    });
    dialogRef.afterClosed().subscribe( result => {
      if(result && result.ok){
        // Delete the category...
        console.log('La categoria se ha eliminado...');
      }
    })
  }

}
