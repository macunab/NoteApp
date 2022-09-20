import { FormGroup } from '@angular/forms';

export function CheckPasswordValidator(controlName: string, matchingControlName: string) {
    return ( formGroup: FormGroup ) => {
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
    }
}