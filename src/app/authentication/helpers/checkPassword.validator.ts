import { AbstractControl, ValidationErrors } from '@angular/forms';

export function CheckPasswordValidator(controlName: string, matchingControlName: string) {
   /* return ( formGroup: FormGroup ) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if(matchingControl.errors && !matchingControl.errors['checkPasswordValidator']) {
            return;
        }
        if(control.value !== matchingControl.value) {
            matchingControl.setErrors({ checkPasswordValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }*/
    return ( formGroup: AbstractControl ): ValidationErrors | null => {
        const control = formGroup.get(controlName);
        const matchingControl = formGroup.get(matchingControlName);
        if(matchingControl?.errors && !matchingControl.errors['checkPasswordValidator']) {
            return null;
        }
        if( control?.value !== matchingControl?.value) {
            matchingControl?.setErrors({ checkPasswordValidator: true });
            return { checkPasswordValidator: true };
        } else {
            matchingControl?.setErrors(null);
            return null;
        }
    }
}