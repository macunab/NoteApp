import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  background-color: #2ecc71;
}
.custom-radios input[type="radio"]#color-2 + label span {
  background-color: #3498db;
}
.custom-radios input[type="radio"]#color-3 + label span {
  background-color: #f1c40f;
}
.custom-radios input[type="radio"]#color-4 + label span {
  background-color: #e74c3c;
}
.custom-radios input[type="radio"]#color-5+ label span {
  background-color: #ff00e9;
}
.custom-radios input[type="radio"]#color-6+ label span {
  background-color: #b18021;
}
.custom-radios input[type="radio"]#color-7+ label span {
  background-color: #611986;
}
.custom-radios input[type="radio"]#color-8+ label span {
  background-color: #bbfaa6;
}
.custom-radios input[type="radio"]:checked + label span img {
  opacity: 1;
}
    `
  ]
})
export class AddCategoryComponent implements OnInit {

  categoryForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    color: ['color-1', [Validators.required]]
  });

  constructor( private fb: FormBuilder, 
    public dialogRef: MatDialogRef<AddCategoryComponent>) { }

  ngOnInit(): void {
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
