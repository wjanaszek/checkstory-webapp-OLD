import { Component } from '@angular/core';
import { User } from './models/user.model';
import { fadeInAnimation } from './animations/fadeInAnimation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [ fadeInAnimation ],
  host: { '[@fadeInAnimation]': '' }
})
export class AppComponent {
  title = 'Checkstory';

  private user: User;

  constructor() { }

  hasLoggedInUser(): boolean {
    return false;
  }
}
