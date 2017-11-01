import { Headers, RequestOptions } from '@angular/http';

export function jwt() {
  // create authorization header with jwt token
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const token = JSON.parse(localStorage.getItem('jwt-token'));
  if (currentUser && token) {
    const headers = new Headers({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'Application/json'
    });
    return new RequestOptions({ headers: headers });
  } else {
    const headers = new Headers({
      'Content-Type': 'Application/json'});
    return new RequestOptions({ headers: headers });
  }
}
