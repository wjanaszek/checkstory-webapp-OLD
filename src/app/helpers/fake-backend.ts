import {
  Http, BaseRequestOptions, Response, XHRBackend, RequestMethod, ResponseOptions,
  RequestOptions
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

export function fakeBackendFactory(backend: MockBackend, options: BaseRequestOptions, realBackend: XHRBackend) {
  // array in local storage for registred users
  const users: any[] = JSON.parse(localStorage.getItem('users')) || [];

  // configure fake backend:
  backend.connections.subscribe((connection: MockConnection) => {
    setTimeout(() => {

      // authenticate
      if (connection.request.url.endsWith('/api/authenticate') && connection.request.method === RequestMethod.Post) {
        // get parameters from post request
        const params = JSON.parse(connection.request.getBody());

        // find if any user matches login credentianls
        const filteredUsers = users.filter(user => {
          return user.login === params.login && user.password === params.password;
        });

        if (filteredUsers.length) {
          // if login details are valid return 200 OK with user details and fake jwt token
          const user = filteredUsers[0];
          connection.mockRespond(new Response(new ResponseOptions({
            status: 200,
            body: {
              id: user.id,
              login: user.login,
              token: 'fake-jwt-token'
            }
          })));
        } else {
          // return 400 bad request
          connection.mockError(new Error('Login or password is incorrect'));
        }

        return;
      }

      // get users
      if (connection.request.url.endsWith('/api/users') && connection.request.method === RequestMethod.Get) {
        // check for fake auth token in header and return user if valid, this security is implemented server side
        if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
          connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: users })));
        } else {
          // return 401 not authorised if token is null or invalid
          connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
        }

        return;
      }

      // get user by id
      if (connection.request.url.match(/\/api\/users\/\d+$/) && connection.request.method === RequestMethod.Get) {
        // check for fake auth token in header and return user if valid, this security is implemented server side
        if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
          // find user by id in users array
          const urlParts = connection.request.url.split('/');
          const id: number = parseInt(urlParts[urlParts.length - 1]);
          const matchedUsers = users.filter(user => {
            return user.id === id;
          });
          const user = matchedUsers.length ? matchedUsers[0] : null;

          // respond 200 OK with user
          connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: user })));
        } else {
          // return 401 not authorized if token is null or invalid
          connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
        }

        return;
      }

      // create user
      if (connection.request.url.endsWith('/api/users') && connection.request.method === RequestMethod.Post) {
        // get new user info form post body
        const newUser = JSON.parse(connection.request.getBody());

        // validation
        const duplicateUser = users.filter(user => {
          return user.login === newUser.login;
        }).length;
        if (duplicateUser) {
          return connection.mockError(new Error('Login "' + newUser.login + '" already in use'));
        }

        // save new user
        newUser.id = users.length + 1;
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // respond 200 OK
        connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));

        return;
      }

      // delete user
      if (connection.request.url.match(/\/api\/users\/\d+$/) && connection.request.method === RequestMethod.Delete) {
        // check for fake auth token and return user if valid
        if (connection. request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
          const urlParts = connection.request.url.split('/');
          const id: number = parseInt(urlParts[urlParts.length - 1]);
          for (let i = 0; i < users.length; i++) {
            if (users[i].id === id) {
              // delete user
              users.splice(i, 1);
              localStorage.setItem('users', JSON.stringify(users));
              break;
            }
          }

          // respond 200 OK
          connection.mockRespond(new Response(new ResponseOptions({ status: 200})));
        }

        return;
      }

      // pass through any requests not handled above
      const realHttp = new Http(realBackend, options);
      const requestOptions = new RequestOptions({
        method: connection.request.method,
        headers: connection.request.headers,
        body: connection.request.getBody(),
        url: connection.request.url,
        withCredentials: connection.request.withCredentials,
        responseType: connection.request.responseType
      });
      realHttp.request(connection.request.url, requestOptions)
        .subscribe((response: Response) => {
          connection.mockRespond(response);
        },
          (error: any) => {
        connection.mockError(error);
        });
    }, 500);
  });

  return new Http(backend, options);
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: Http,
  useFactory: fakeBackendFactory,
  deps: [MockBackend, BaseRequestOptions, XHRBackend]
};
