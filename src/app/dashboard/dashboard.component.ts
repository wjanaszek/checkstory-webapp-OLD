import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from '../animations/fadeInAnimation';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  animations: [ fadeInAnimation ],
  host: { '[@fadeInAnimation]': '' }
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  private goHome() {
    this.router.navigate(['dashboard']);
  }

  private goMyAccount() {
    this.router.navigate(['dashboard', 'myaccount']);
  }

  private goLogout() {
    this.authenticationService.logout();
    this.router.navigate(['/home']);
  }

  private goStories() {
    this.router.navigate(['dashboard']);
  }
}
