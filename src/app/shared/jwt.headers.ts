import { Headers, RequestOptions } from '@angular/http';

export function jwt() {
  // create authorization header with jwt token
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser && currentUser.token) {
    const headers = new Headers({
      'Authorization': 'Bearer ' + currentUser.token,
      'Content-Type': 'Application/json'
    });
    return new RequestOptions({ headers: headers });
  } else {
    const headers = new Headers({
      'Content-Type': 'Application/json'});
    return new RequestOptions({ headers: headers });
  }
}
