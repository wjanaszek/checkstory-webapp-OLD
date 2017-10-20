import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable()
export class ChangePasswordValidationService {

  constructor(private http: Http) { }

  checkPassword(id: number, password: string) {
    const requestHeaders = new Headers({
      'Content-Type': 'application/json'
    });
    const hashedPassword = Md5.hashStr(password);
    return this.http.post(environment.apiUrl + `/api/users/checkPassword/${id}`, hashedPassword, { headers: requestHeaders })
      .map(res => res.json());
  }
}
