import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

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

  constructor( private fb: FormBuilder, private authService: AuthService ) { }

  ngOnInit(): void {
  }

  googleLogin() {
    /**
     * TODO backend: in the callback redirect and send the token
     *  frontend: save the token in localstorage.
     */
    window.location.href = 'http://localhost:4000/auth/google';
    let listener = window.addEventListener('message', (message) => {
      console.log(message);
    });

  }

  loginSubmit() {
    if(this.loginForm.invalid) {
      console.log('ES INVALIDO');
      return;
    }
    console.log(this.loginForm.value);
  }

}
