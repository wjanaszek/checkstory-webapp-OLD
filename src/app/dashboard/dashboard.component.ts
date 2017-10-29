import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from '../shared/animations/fadeInAnimation';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/services/authentication.service';
import { DialogsService } from '../shared/services/dialogs.service';

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
    console.log('change password here?');
  }

  private goLogout() {
    this.authenticationService.logout();
    this.router.navigate(['/home']);
  }
}

