import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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
  loading: boolean = false;

  constructor( private fb: FormBuilder, private authService: AuthService, 
      private route: Router) { }

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
      return;
    }
    this.loading = true;
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password)
      .subscribe( res => {
        if(res) {
          this.loading = false;
          this.route.navigateByUrl('home')
          return;
        }
        Swal.fire({
          title: 'El usuario o contrasena no pertenecen a un usuario existente',
          icon: 'error'
        })
        this.loading = false;
      })
  }

}
