import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent implements OnInit {

  @Output()
  logoutAction: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  changePasswordAction: EventEmitter<any> = new EventEmitter<any>();

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  isLoggedIn() {
    return this.authenticationService.loggedIn();
  }

  goLogin() {
    this.router.navigate(['/login']);
  }

  goRegister() {
    this.router.navigate(['/register']);
  }

  goStoryList() {
    this.router.navigate(['/dashboard/story-list']);
  }

  openChangePasswordDialog() {
    this.changePasswordAction.emit();
  }

  openConfirmDialog() {
    this.logoutAction.emit();
  }
}
