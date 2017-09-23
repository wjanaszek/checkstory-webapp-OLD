import { Injectable } from '@angular/core';

@Injectable()
export class User {
  /* Fields:
  - login
  - email
  - password
   */
  constructor(public login: string, public email: string, public password: string) { }
}
