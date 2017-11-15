import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  private router: Router;

  constructor(private injector: Injector) {
    //setTimeout(() => this.router = injector.get(Router));
  }

  handleError(error) {
    // console.log('ERROR = ' + JSON.stringify(error));

    this.router.navigate(['/error']);
    // throw error;
  }
}
