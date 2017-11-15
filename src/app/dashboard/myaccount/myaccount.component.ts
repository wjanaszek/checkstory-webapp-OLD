import { Component, Inject, OnInit } from '@angular/core';
import { fadeInAnimation } from '../../shared/animations/fadeInAnimation';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { UserService } from '../../shared/services/user-service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidation } from '../../shared/password.validation';
import { ChangePasswordActionModel } from '../../shared/models/change-password-action.model';
import { ChangePasswordValidationService } from '../../shared/services/change-password.validation.service';
import { User } from '../../shared/models/user.model';

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
}
