import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Http, Response } from '@angular/http';
import { environment } from '../../../environments/environment';
import { Md5 } from 'ts-md5/dist/md5';
import { jwt } from '../jwt.headers';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  getAll() {
    return this.http.get(environment.apiUrl + '/api/users', jwt())
      .map((response: Response) => response.json());
  }

  getById(id: number) {
    return this.http.get(environment.apiUrl + '/api/users/' + id, jwt())
      .map((response: Response) => response.json());
  }

  //release
  create(user: User) {
    const hashedPassword = Md5.hashStr(user.password);
    console.log('hashed password: ' + hashedPassword);
    return this.http.post(environment.apiUrl + '/api/users', JSON.stringify({ login: user.login, email: user.email, password: hashedPassword }), jwt())
      .map((response: Response) => {
        const userFromResponse = response.json();
        // login registered user
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      });
  }

  update(user: User) {
    const hashedPassword = Md5.hashStr(user.password);
    return this.http.put(environment.apiUrl + '/api/users/' + user.id,
      JSON.stringify({
        id: user.id,
        login: user.login,
        email: user.email,
        password: hashedPassword
      }), jwt())
      .map((response: Response) => response.json());
  }

  delete(id: number) {
    return this.http.delete(environment.apiUrl + '/api/users/' + id, jwt())
      .map((response: Response) => response.json());
  }
}
