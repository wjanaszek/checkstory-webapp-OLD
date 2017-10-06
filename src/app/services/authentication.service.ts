import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

  constructor(private http: Http) { }

  login(login: string, password: string) {
    return this.http.post('/api/authenticate', JSON.stringify({ login: login, password: password }))
      .map((response: Response) => {
      // login succesfull if there is a jwt token in response
        const user = response.json();
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  register(login: string, email: string, password: string) {
    return this.http.post('/api/users', JSON.stringify({ login: login, email: email, password: password }))
      .map((response: Response) => {
        const user = response.json();
        // login registered user
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      });
  }
}
