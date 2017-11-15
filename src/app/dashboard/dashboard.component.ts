import { Component, Inject, OnInit } from '@angular/core';
import { fadeInAnimation } from '../shared/animations/fadeInAnimation';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/services/authentication.service';
import { DialogsService } from '../shared/services/dialogs.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { ChangePasswordValidationService } from '../shared/services/change-password.validation.service';
import { PasswordValidation } from '../shared/password.validation';
import { ChangePasswordActionModel } from '../shared/models/change-password-action.model';
import { User } from '../shared/models/user.model';
import { UserService } from '../shared/services/user-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  animations: [ fadeInAnimation ],
  host: { '[@fadeInAnimation]': '' }
})
export class DashboardComponent implements OnInit {
  defaultRoute: boolean;

  constructor(private router: Router,
              public changePasswordDialog: MatDialog,
              private userService: UserService,
              private authenticationService: AuthenticationService,
              public dialogsService: DialogsService) { }

  ngOnInit() {
    if (this.router.url.endsWith('dashboard/story-list')) {
      this.defaultRoute = true;
    } else {
      this.defaultRoute = false;
    }
  }

  openConfirmDialog() {
    this.dialogsService
      .confirm('Logout', 'Are you sure you want to logout?', 'Yes', 'No')
      .subscribe(result => {
        if (result === true) {
          this.goLogout();
        }
      });
  }

  openChangePasswordDialog() {
    this.changePasswordDialog.open(ChangePasswordDialogComponent, {
      disableClose: true,
      data: this.changePassword.bind(this)
    });
  }

  changePassword(event) {
    const user = new User();
    user.password = event.newPassword;
    this.userService.update(user);
  }

  private goLogout() {
    this.authenticationService.logout();
    this.router.navigate(['/home']);
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

  changePassword() {
    this.data(new ChangePasswordActionModel(
      this.changePasswordForm.get('oldPassword').value,
      this.changePasswordForm.get('newPassword').value)
    );
  }

  validateOldPassword(control: AbstractControl) {
    return this.changePasswordValidationService.checkPassword(control.value)
      .map(res => {
        return res ? null : { passwordNotCorrect: true };
      });
  }
}

