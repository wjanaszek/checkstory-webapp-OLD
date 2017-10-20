import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Md5 } from "ts-md5/dist/md5";
import { environment } from '../../../environments/environment';
import { jwt } from '../jwt.headers';

@Injectable()
export class AuthenticationService {

  constructor(private http: Http) { }

  login(login: string, password: string) {
    const hashedPassword = Md5.hashStr(password);
    console.log('hashed password: ' + hashedPassword);
    return this.http.post(environment.apiUrl + '/api/authenticate', JSON.stringify({ login: login, password: hashedPassword }), jwt())
      .map((response: Response) => {
      // login succesfull if there is a jwt token in response
        const responseBody = response.json();
        if (responseBody && responseBody.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(responseBody.user));
        }

        return responseBody.user;
      });
  }

  logout() {
    // remove user from local storage to log user out
    console.log('logged out: ' + JSON.stringify(localStorage.getItem('currentUser')));
    localStorage.removeItem('currentUser');
  }

  // register(login: string, email: string, password: string) {
  //   const hashedPassword = Md5.hashStr(password);
  //   console.log('hashed password: ' + hashedPassword);
  //   return this.http.post(environment.apiUrl + '/api/users', JSON.stringify({ login: login, email: email, password: hashedPassword }))
  //     .map((response: Response) => {
  //       const user = response.json();
  //       // login registered user
  //       if (user && user.token) {
  //         // store user details and jwt token in local storage to keep user logged in between page refreshes
  //         localStorage.setItem('currentUser', JSON.stringify(user));
  //       }
  //
  //       return user;
  //     });
  // }
}
