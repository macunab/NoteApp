import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface Category {
  id?: string;
  name: string;
  color: string;
}

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styles: [
    `
.custom-radios div {
  display: inline-block;
}
.custom-radios input[type="radio"] {
  display: none;
}
.custom-radios input[type="radio"] + label {
  color: #333;
  font-family: Arial, sans-serif;
  font-size: 14px;
}
.custom-radios input[type="radio"] + label span {
  display: inline-block;
  width: 40px;
  height: 40px;
  margin: -1px 4px 0 0;
  vertical-align: middle;
  cursor: pointer;
  border-radius: 50%;
  border: 2px solid #FFFFFF;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.33);
  background-repeat: no-repeat;
  background-position: center;
  text-align: center;
  line-height: 44px;
}
.custom-radios input[type="radio"] + label span img {
  opacity: 0;
  transition: all 0.3s ease;
}
.custom-radios input[type="radio"]#color-1 + label span {
  background-color: #B5EAD7;
}
.custom-radios input[type="radio"]#color-2 + label span {
  background-color: #C7CEEA;
}
.custom-radios input[type="radio"]#color-3 + label span {
  background-color: #E2F0CB;
}
.custom-radios input[type="radio"]#color-4 + label span {
  background-color: #FFDAC1;
}
.custom-radios input[type="radio"]#color-5+ label span {
  background-color: #FFB7B2;
}
.custom-radios input[type="radio"]#color-6+ label span {
  background-color: #FF9AA2;
}
.custom-radios input[type="radio"]#color-7+ label span {
  background-color: #FFD5FA;
}
.custom-radios input[type="radio"]#color-8+ label span {
  background-color: #B79FF1;
}
.custom-radios input[type="radio"]:checked + label span img {
  opacity: 1;
}
    `
  ]
})
export class AddCategoryComponent implements OnInit {

  categoryForm: FormGroup = this.fb.group({
    name: [this.data ? this.data.name : '' , [Validators.required]],
    color: [this.data ? this.data.color : 'color-1', [Validators.required]]
  });

  title: string = '';

  constructor( private fb: FormBuilder, 
    public dialogRef: MatDialogRef<AddCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category) { }

  ngOnInit(): void {
    console.log();
    if(this.data) {
      this.title = 'Editar Categoria:';
    } else {
      this.title = 'Nueva Categoria:';
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveCategory() {
    if(this.categoryForm.invalid) {
      console.log('El formulario no es valido');
      return;
    }
    console.log(JSON.stringify(this.categoryForm.value));
    console.log('Se guardo la categoria');
    this.dialogRef.close();
  }

}
