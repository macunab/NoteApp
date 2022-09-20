import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CheckPasswordValidator } from '../helpers/checkPassword.validator';
import { EmailValidatorService } from '../services/email-validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email], [ this.emailValidator ]],
    password: ['', [Validators.required, Validators.minLength(5)]],
    confirmPassword: ['', [Validators.required]]
  }, {
    validator: CheckPasswordValidator('password', 'confirmPassword')
  });
  hide: boolean = true;
  hidePassword: boolean = true;

  constructor( private fb: FormBuilder, private emailValidator: EmailValidatorService ) { }

  ngOnInit(): void {
  }

  registerSubmit() {

  }
}
