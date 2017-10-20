import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { environment } from '../../../environments/environment';
import { Md5 } from "ts-md5/dist/md5";

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  getAll() {
    return this.http.get(environment.apiUrl + '/api/users', this.jwt())
      .map((response: Response) => response.json());
  }

  getById(id: number) {
    return this.http.get(environment.apiUrl + '/api/users/' + id, this.jwt())
      .map((response: Response) => response.json());
  }

  create(user: User) {
    const hashedPassword = Md5.hashStr(user.password);
    console.log('hashed password: ' + hashedPassword);
    return this.http.post(environment.apiUrl + '/api/users', JSON.stringify({ login: user.login, email: user.email, password: hashedPassword }), this.jwt())
      .map((response: Response) => {
        const userFromResponse = response.json();
        // login registered user
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      });
    // return this.http.post(environment.apiUrl + '/api/users', user, this.jwt())
    //   .map((response: Response) => response.json());
  }

  update(user: User) {
    return this.http.put(environment.apiUrl + '/api/users/' + user.id, user, this.jwt())
      .map((response: Response) => response.json());
  }

  delete(id: number) {
    return this.http.delete(environment.apiUrl + '/api/users/' + id, this.jwt())
      .map((response: Response) => response.json());
  }

  private jwt() {
    // create authorization header with jwt token
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      const headers = new Headers({
        'Authorization': 'Bearer ' + currentUser.token,
        'Content-Type': 'Application/json'
      });
      return new RequestOptions({headers: headers});
    } else {
      const headers = new Headers({
        'Content-Type': 'Application/json'});
      return new RequestOptions({ headers: headers });
    }
  }
}
