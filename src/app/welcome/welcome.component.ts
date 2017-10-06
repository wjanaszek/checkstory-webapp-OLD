import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  private backToHome() {
    this.router.navigate(['/home']);
  }

  private toLogin() {
    this.router.navigate(['/login']);
  }
}
