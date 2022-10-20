import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CheckPasswordValidator } from '../helpers/checkPassword.validator';
import { User } from '../interfaces/interfaces';
import { AuthService } from '../services/auth.service';
import { EmailValidatorService } from '../services/email-validator.service';
import Swal from 'sweetalert2';

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


  constructor( private fb: FormBuilder, private emailValidator: EmailValidatorService,
      private authService: AuthService ) { }

  ngOnInit(): void {
  }

  registerSubmit() {
    const user: User = this.registerForm.value;
    if(this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    this.authService.register(user)
      .subscribe( res => {
        if(res) {
          this.registerForm.reset();
          Swal.fire({
            title: 'Se ha creado el usuario exitosamente, ingrese al sistema con el email y password correspondiente',
            icon: 'success',
            showConfirmButton: false,
            timer: 4500
          })
          return;
        }
        Swal.fire({
          icon: 'error',
          title: 'Se ha producido un error al intentar crear un nuevo usuario, por favor intentelo de nuevo mas tarde',
        });
      })
  }
}
