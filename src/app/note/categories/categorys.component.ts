import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { CategoriesService } from '../services/categories.service';
import { AddCategoryComponent } from './add-category.component';
import Swal from 'sweetalert2';
import { Category } from '../interfaces/interfaces';


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

  categories: Array<Category> = [];
  loadingData: boolean = true;
  emptyData: boolean = false;

  constructor( public dialog: MatDialog, private categoriesService: CategoriesService ) { }

  ngOnInit(): void {
    this.categoriesService.getAllCategories()
      .subscribe( resp => {
        this.categories = resp;
        this.loadingData = false;
        this.emptyData = !(this.categories.length > 0);
      })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '350px',
      height: '450px',
      data: {}
    });
    dialogRef.afterClosed().subscribe( result => {
      if(result){
        this.categories.push(result);
        this.emptyData = !(this.categories.length > 0);
        this.categories = [ ...this.categories ];
      }
    })
  }

  selectCategory(category: Category) {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '350px',
      data: category
    });
    dialogRef.afterClosed().subscribe( result => {
      if(result == undefined) {
        return;
      }
      const index = this.categories.findIndex(val => val._id === result._id);
      (index !== -1) ? this.categories[index] = result : '';
    });
  }

  delete(category: Category) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { type: 'Category', name: category.name, id: category._id }
    });
    dialogRef.afterClosed().subscribe( result => {
      if(result && result.ok){
        this.categoriesService.deleteCategory(result.id)
          .subscribe( res => {
            if(res) {
              this.categories = this.categories.filter( val => val._id !== result.id);
              Swal.fire({
                title: 'Se ha eliminado la categoria exitosamente',
                icon: 'success'
              });
              this.emptyData = !(this.categories.length > 0);
            } else {
              Swal.fire({
                title: 'Ups ha ocurrido un error mientras se intentaba eliminar la categoria',
                icon: 'error'
              });
            }
          });
      }
    })
  }

}
