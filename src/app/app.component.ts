import { Component } from '@angular/core';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Checkstory';

  private user: User;

  constructor() { }

  hasLoggedInUser(): boolean {
    return false;
  }
}
