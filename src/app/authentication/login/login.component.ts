import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

declare const google: any;

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
export class LoginComponent implements OnInit, AfterViewInit{

  @ViewChild('googleBtn') googleBtn!: ElementRef;

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

  ngAfterViewInit(): void {
    this.googleLogin();
  }

  googleLogin() {
    google.accounts.id.initialize({
      client_id: environment.googleID,
      callback: (response: any) => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse( response: any ) {
    console.log(response.credential);
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
