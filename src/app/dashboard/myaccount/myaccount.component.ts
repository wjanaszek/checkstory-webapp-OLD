import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from '../../shared/animations/fadeInAnimation';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  animations: [ fadeInAnimation ],
  host: { '[@fadeInAnimation]': '' }
})
export class MyAccountComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
