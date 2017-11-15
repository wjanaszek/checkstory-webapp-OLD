import { Component } from '@angular/core';
import { User } from './shared/models/user.model';
import { fadeInAnimation } from './shared/animations/fadeInAnimation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [ fadeInAnimation ],
  host: { '[@fadeInAnimation]': '' }
})
export class AppComponent {
  title = 'Checkstory';

  constructor() { }
}
