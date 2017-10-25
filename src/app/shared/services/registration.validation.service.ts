import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class RegistrationValidationService {

  private emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  constructor(private http: Http) { }

  // check(emails: Observable<string>) {
  //   return emails.debounceTime(300)
  //     .distinctUntilChanged()
  //     .switchMap(email => this.checkEmailAvailable(email));
  // }
  //
  // checkEmailAvailable(email) {
  //   this.http.get(environment.apiUrl + '/api/users/checkEmail', {
  //     body: email
  //   }).map(res => res.json());
  // }

  checkEmailNotTaken(email: string) {
    const requestHeaders = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post(environment.apiUrl + '/api/users/checkEmail', email, { headers: requestHeaders })
      .map(res => res.json());
  }

  checkEmailRegex(email: string): boolean {
    return this.emailRegex.test(email);
  }

  checkLoginNotTaken(login: string) {
    const requestHeaders = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post(environment.apiUrl + '/api/users/checkLogin', login, { headers: requestHeaders })
      .map(res => res.json());
  }
}
