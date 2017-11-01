import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Md5 } from 'ts-md5/dist/md5';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class ChangePasswordValidationService {

  constructor(private authHttp: AuthHttp) { }

  checkPassword(id: number, password: string) {
    const hashedPassword = Md5.hashStr(password);
    return this.authHttp.post(environment.apiUrl + `/api/users/checkPassword/${id}`, hashedPassword)
      .map(res => res.json());
  }
}
