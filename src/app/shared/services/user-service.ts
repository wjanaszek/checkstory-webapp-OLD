import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Http, Headers, Response } from '@angular/http';
import { environment } from '../../../environments/environment';
import { Md5 } from 'ts-md5/dist/md5';
import { AuthHttp, JwtHelper } from 'angular2-jwt';

@Injectable()
export class UserService {

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private authHttp: AuthHttp, private http: Http) { }

  getAll() {
    return this.authHttp.get(environment.apiUrl + '/api/users')
      .map((response: Response) => response.json());
  }

  getById(id: number) {
    return this.authHttp.get(environment.apiUrl + `/api/users/${id}`)
      .map((response: Response) => response.json());
  }

  create(user: User) {
    const hashedPassword = Md5.hashStr(user.password);
    const headers = new Headers();
    headers.append('Content-Type', 'Application/json');
    console.log('hashed password: ' + hashedPassword);
    return this.http.post(environment.apiUrl + '/api/users', JSON.stringify({ login: user.login, email: user.email, password: hashedPassword }),
      { headers: headers })
      .map((response: Response) => response.json());   // TODO mail with token to finalize register
  }

  update(user: User) {
    const hashedPassword = Md5.hashStr(user.password);
    const token = localStorage.getItem('jwt-token');
    console.log('updating: ' + JSON.stringify(this.jwtHelper.decodeToken(token)));
    return this.authHttp.put(environment.apiUrl + `/api/users/${user.id}`,
      JSON.stringify({
        id: user.id,
        login: user.login,
        email: user.email,
        password: hashedPassword
      }))
      .map((response: Response) => response.json());
  }

  delete(id: number) {
    return this.authHttp.delete(environment.apiUrl + `/api/users/${id}`)
      .map((response: Response) => response.json());
  }
}
