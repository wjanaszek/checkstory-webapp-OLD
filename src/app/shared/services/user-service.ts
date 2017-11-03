import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Http, Headers, Response } from '@angular/http';
import { environment } from '../../../environments/environment';
import { Md5 } from 'ts-md5/dist/md5';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';

@Injectable()
export class UserService {

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private authHttp: AuthHttp, private http: Http, private router: Router) { }

  getAll() {
    return this.authHttp.get(environment.apiUrl + '/api/users')
      .map((response: Response) => response.json());
  }

  getById(id: number) {
    return this.authHttp.get(environment.apiUrl + `/api/users/${id}`)
      .map((response: Response) => response.json());
  }

  //release
  create(user: User) {
    const hashedPassword = Md5.hashStr(user.password);
    const headers = new Headers();
    headers.append('Content-Type', 'Application/json');
    return this.http.post(environment.apiUrl + '/api/users', JSON.stringify({ login: user.login, email: user.email, password: hashedPassword }),
      { headers: headers })
      .map((response: Response) => response.json());   // TODO mail with token to finalize register
  }

  update(user: User) {
    const hashedPassword = Md5.hashStr(user.password);
    const token = localStorage.getItem('jwt-token');
    const userId = this.jwtHelper.decodeToken(token).userId;
    // console.log('action: ' + JSON.stringify({
    //   id: userId,
    //   login: '',
    //   email: '',
    //   password: hashedPassword}));
    return this.authHttp.put(environment.apiUrl + `/api/users/${userId}`,
      JSON.stringify({
        id: userId,
        login: '',
        email: '',
        password: hashedPassword
      }))
      .subscribe(
        (res) => res.json(),
        (err) => this.router.navigate(['/error']));
  }

  delete(id: number) {
    return this.authHttp.delete(environment.apiUrl + `/api/users/${id}`)
      .subscribe(
        (res) => res.json(),
        (err) => this.router.navigate(['/error']));
  }
}
