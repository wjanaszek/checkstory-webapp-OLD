import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Md5 } from 'ts-md5/dist/md5';
import { AuthHttp, JwtHelper } from 'angular2-jwt';

@Injectable()
export class ChangePasswordValidationService {

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private authHttp: AuthHttp) { }

  checkPassword(password: string) {
    const hashedPassword = Md5.hashStr(password);
    const token = localStorage.getItem('jwt-token');
    const userId = this.jwtHelper.decodeToken(token).userId;
    return this.authHttp.post(environment.apiUrl + `/api/users/checkPassword/${userId}`, hashedPassword)
      .map(res => res.json());
  }
}
