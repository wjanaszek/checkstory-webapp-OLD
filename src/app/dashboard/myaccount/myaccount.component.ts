import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { fadeInAnimation } from '../../shared/animations/fadeInAnimation';
import { Router } from '@angular/router';
import { MD_DIALOG_DATA, MdDialog, MdDialogRef } from '@angular/material';
import { UserService } from '../../services/user-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidation } from '../../shared/password.validation';
import { ChangePasswordActionModel } from '../../models/change-password-action.model';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  animations: [ fadeInAnimation ],
  host: { '[@fadeInAnimation]': '' }
})
export class MyAccountComponent implements OnInit {

  storiesCount: number;

  constructor(private router: Router,
              public changePasswordDialog: MdDialog,
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
  }
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change.password.dialog.html'
})
export class ChangePasswordDialogComponent {

  changePasswordForm: FormGroup;

  constructor(@Inject(MD_DIALOG_DATA) public data: any, public dialogRef: MdDialogRef<ChangePasswordDialogComponent>, private fb: FormBuilder) {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
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
}
