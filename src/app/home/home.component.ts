import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInAnimation } from '../shared/animations/fadeInAnimation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  animations: [ fadeInAnimation ],
  host: { '[@fadeInAnimation]': '' }
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  showRegisterForm() {
    this.router.navigate(['/register']);
  }

  showLoginForm() {
    this.router.navigate(['/login']);
  }
}
