import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = this.fb.group({

  });
  hide: boolean = true;

  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {
  }

  registerSubmit() {

  }
}
