import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html'
})
export class ErrorPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goDashboard() {
    this.router.navigate(['/dashboard/story-list']);
  }
}
