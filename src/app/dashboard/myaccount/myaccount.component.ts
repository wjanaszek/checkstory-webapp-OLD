import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { fadeInAnimation } from '../../shared/animations/fadeInAnimation';
import { Router } from '@angular/router';
import { MD_DIALOG_DATA, MdDialog, MdDialogRef } from '@angular/material';
import { UserService } from '../../services/user-service';

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
    const dialogRef = this.changePasswordDialog.open(ChangePasswordDialogComponent, {
      data: {
        disableClose: true
      }
    });
  }

  changePassword(event) {
    console.log(event);
  }
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change.password.dialog.html'
})
export class ChangePasswordDialogComponent {

  @Output()
  changePasswordEvent = new EventEmitter<any>();
  popupContent;

  constructor(@Inject(MD_DIALOG_DATA) public data: any, public dialogRef: MdDialogRef<ChangePasswordDialogComponent>) {
  }

  changePassword() {

  }
}
