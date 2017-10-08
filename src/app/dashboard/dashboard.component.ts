import { Component, Inject, OnInit } from '@angular/core';
import { fadeInAnimation } from '../shared/animations/fadeInAnimation';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { MD_DIALOG_DATA, MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  animations: [ fadeInAnimation ],
  host: { '[@fadeInAnimation]': '' }
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              public confirmDialog: MdDialog) { }

  ngOnInit() {
  }

  openConfirmDialog() {
    const dialogRef = this.confirmDialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('result: ' + result);
      if (result === 'true') {
        this.goLogout();
      }
    });
  }

  private goLogout() {
    this.authenticationService.logout();
    this.router.navigate(['/home']);
  }
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.html'
})
export class ConfirmDialogComponent {
  constructor(@Inject(MD_DIALOG_DATA) public data: any, public dialogRef: MdDialogRef<ConfirmDialogComponent>) { }

}

