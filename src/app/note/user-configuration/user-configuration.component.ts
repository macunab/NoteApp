import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckPasswordValidator } from 'src/app/authentication/helpers/checkPassword.validator';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { PasswordValidatorService } from 'src/app/authentication/services/password-validator.service';

@Component({
  selector: 'app-user-configuration',
  templateUrl: './user-configuration.component.html',
  styles: [
  ]
})
export class UserConfigurationComponent implements OnInit {
  
  changePasswordForm: FormGroup = this.fb.group({
    actualPassword: ['', [ Validators.required ], [this.passwordValidator]],
    password: ['', [ Validators.required ]],
    confirmPassword: ['', [ Validators.required ]]
  },
  {
    validator: CheckPasswordValidator('password', 'confirmPassword')
  });
 // validForm: boolean = true;
  passwordInput: boolean = true;
  newPasswordInput: boolean = true;
  confirmPasswordInput: boolean = true;

  constructor( private fb: FormBuilder, private authService: AuthService, 
    private passwordValidator: PasswordValidatorService) { }

  ngOnInit(): void {
  }

  updatePassword() {
    if(this.changePasswordForm.invalid) {
      return;
    }
    console.log('Password will be updated');
    const { password } = this.changePasswordForm.value;
    console.log(password);
  }

}
