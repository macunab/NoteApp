import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    `
    .main-content {
      padding-top: 100px;
    }

    .auth-google {
      margin-top: 20px;
    }
    a {
      text-decoration: none;
    }
    `
  ]
})
export class LoginComponent implements OnInit {

  // todo validations to api... todo api
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]]
  });

  hide: boolean = true;

  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {
  }

  loginSubmit() {
    if(this.loginForm.invalid) {
      console.log('ES INVALIDO');
      return;
    }
    console.log('login');
  }

}
