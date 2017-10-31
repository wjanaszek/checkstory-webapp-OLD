import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Md5 } from 'ts-md5/dist/md5';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthenticationService {

  constructor(private http: Http) { }

  login(login: string, password: string) {
    const hashedPassword = Md5.hashStr(password);
    console.log('hashed password: ' + hashedPassword);
    const headers = new Headers({
      'Content-Type': 'Application/json'});
    return this.http.post(environment.apiUrl + '/login', JSON.stringify({ login: login, password: hashedPassword }), { headers: headers })
      .map((res: Response) => {
        const authorization = res.headers.get('Authorization');
        console.log(authorization);
        if (authorization !== null) {

        }
      });
      // .map((response: Response) => {
      //   console.log('headers: ' + JSON.stringify(response));
      // // login succesfull if there is a jwt token in response
      //   const responseBody = response.json();
      //   console.log('succesfuly logged in ' + responseBody);
      //   if (responseBody && responseBody.token) {
      //     // store user details and jwt token in local storage to keep user logged in between page refreshes
      //     localStorage.setItem('currentUser', JSON.stringify(responseBody.user));
      //   }
      //
      //   return responseBody.user;
      // });
  }

  logout() {
    // remove user from local storage to log user out
    console.log('logged out: ' + JSON.stringify(localStorage.getItem('currentUser')));
    localStorage.removeItem('currentUser');
  }
}
