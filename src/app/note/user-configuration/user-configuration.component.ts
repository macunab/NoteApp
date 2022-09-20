import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckPasswordValidator } from 'src/app/authentication/helpers/checkPassword.validator';

@Component({
  selector: 'app-user-configuration',
  templateUrl: './user-configuration.component.html',
  styles: [
  ]
})
export class UserConfigurationComponent implements OnInit {
  
  changePasswordForm: FormGroup = this.fb.group({
    password: ['', [ Validators.required ]],
    confirmPassword: ['', [ Validators.required ]]
  },
  {
    validator: CheckPasswordValidator('password', 'confirmPassword')
  });
 // validForm: boolean = true;
  password: boolean = true;
  newPassword: boolean = true;
  confirmPassword: boolean = true;

  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {
  }

  updatePassword() {

  }

}
