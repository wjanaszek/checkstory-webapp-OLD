import { Component, Inject, OnInit } from '@angular/core';
import { fadeInAnimation } from '../shared/animations/fadeInAnimation';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/services/authentication.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  animations: [ fadeInAnimation ],
  host: { '[@fadeInAnimation]': '' }
})
export class DashboardComponent implements OnInit {
  defaultRoute: boolean;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              public confirmDialog: MatDialog) { }

  ngOnInit() {
    if (this.router.url.endsWith('dashboard/story-list')) {
      this.defaultRoute = true;
    } else {
      this.defaultRoute = false;
    }
  }

  openConfirmDialog() {
    const dialogRef = this.confirmDialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('result: ' + result);
      if (result === 'true') {
        this.goLogout();
      } else {
        this.router.navigate(['/dashboard/myaccount']);
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
  templateUrl: './confirm.dialog.html'
})
export class ConfirmDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ConfirmDialogComponent>) { }

}

