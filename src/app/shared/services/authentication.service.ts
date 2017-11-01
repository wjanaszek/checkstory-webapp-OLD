import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Md5 } from 'ts-md5/dist/md5';
import { environment } from '../../../environments/environment';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthenticationService {

  constructor(private http: Http) { }

  login(login: string, password: string) {
    const hashedPassword = Md5.hashStr(password);
    console.log('hashed password: ' + hashedPassword);
    const headers = new Headers({
      'Content-Type': 'application/json'});
    return this.http.post(environment.apiUrl + '/login', JSON.stringify({ login: login, password: hashedPassword }), { headers: headers })
      .map((res: Response) => {
        console.log('headers: ' + JSON.stringify(res));
        const authorization = res.headers.get('Authorization');
        console.log(authorization);
        if (authorization !== null) {
          localStorage.setItem('jwt-token', authorization.slice(7));
        }
      });
  }

  logout() {
    // remove user from local storage to log user out
    console.log('logged out: ' + JSON.stringify(localStorage.getItem('currentUser')));
    localStorage.removeItem('currentUser');
    localStorage.removeItem('jwt-token');
  }

  loggedIn() {
    return tokenNotExpired('jwt-token');
  }
}
