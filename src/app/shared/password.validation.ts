import { AbstractControl } from '@angular/forms';

export class PasswordValidation {
  static matchPassword(AC: AbstractControl) {
    const password = AC.get('password').value;
    const confirmPassword = AC.get('confirmPassword').value;
    if (password !== confirmPassword) {
      AC.get('confirmPassword').setErrors( { MatchPassword: true } )
    } else {
      return null;
    }
  }

  static matchPasswordByChangePassword(AC: AbstractControl) {
    const newPassword = AC.get('newPassword').value;
    const confirmPassword = AC.get('confirmPassword').value;
    if (newPassword !== confirmPassword) {
      AC.get('confirmPassword').setErrors({ MatchPassword: true } )
    } else {
      return null;
    }
  }
}
