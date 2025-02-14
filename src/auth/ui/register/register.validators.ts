import { AbstractControl, ValidatorFn } from '@angular/forms';

export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
) => {
  return control.value.password === control.value.confirmPassword
    ? null
    : { PasswordNotMatch: true };
};
