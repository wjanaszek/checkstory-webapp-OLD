import { Component, Inject, OnInit } from '@angular/core';
import { fadeInAnimation } from '../../shared/animations/fadeInAnimation';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { UserService } from '../../shared/services/user-service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidation } from '../../shared/password.validation';
import { ChangePasswordActionModel } from '../../shared/models/change-password-action.model';
import { ChangePasswordValidationService } from '../../shared/services/change-password.validation.service';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  animations: [ fadeInAnimation ],
  host: { '[@fadeInAnimation]': '' }
})
export class MyAccountComponent implements OnInit {

  storiesCount: number;

  constructor(private router: Router,
              public changePasswordDialog: MatDialog,
              private userService: UserService) {
    this.storiesCount = 0;
  }

  ngOnInit() {
  }

  openChangePasswordDialog() {
    this.changePasswordDialog.open(ChangePasswordDialogComponent, {
      disableClose: true,
      data: this.changePassword.bind(this)
    });
  }

  changePassword(event) {
    console.log(JSON.stringify(event));
    const user = JSON.parse(localStorage.getItem('currentUser'));
    user.password = event.newPassword;
    this.userService.update(user);
  }
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change.password.dialog.html'
})
export class ChangePasswordDialogComponent {

  changePasswordForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
              private changePasswordValidationService: ChangePasswordValidationService,
              private fb: FormBuilder) {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', [Validators.required], this.validateOldPassword.bind(this)],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: PasswordValidation.matchPasswordByChangePassword
    });
  }

  private changePassword() {
    console.log('changepassword dialog');
    this.data(new ChangePasswordActionModel(
      this.changePasswordForm.get('oldPassword').value,
      this.changePasswordForm.get('newPassword').value)
    );
  }

  validateOldPassword(control: AbstractControl) {
    // TODO biezacy user ze store (trzeba zrobic store) - tymczasowo z localStorage
    return this.changePasswordValidationService.checkPassword(JSON.parse(localStorage.getItem('currentUser')).id, control.value)
      .map(res => {
        return res ? null : { passwordNotCorrect: true };
      });
  }
}
