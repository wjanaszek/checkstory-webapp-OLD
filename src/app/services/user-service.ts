import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
  public user: User;

  constructor() {
    this.user = new User('admin', 'admin@admin.com', 'admin');
  }

}
