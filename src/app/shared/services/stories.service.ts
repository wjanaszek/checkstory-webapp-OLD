import { Injectable } from '@angular/core';
import { Story } from '../models/story.model';
import { Headers, Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class StoriesService {

  constructor(private http: Http) { }

  getAll(): Observable<Story[]> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const requestParam = new URLSearchParams();
    requestParam.append('userId', `${currentUser.id}`);
    return this.http.get(environment.apiUrl + '/api/stories', { headers: headers, params: requestParam })
      .map(res => res.json());
  }

  getById(id: number): Observable<Story> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const requestParam = new URLSearchParams();
    requestParam.append('userId', `${currentUser.id}`);
    return this.http.get(environment.apiUrl + `/api/stories/${id}`, { headers: headers })
      .map(res => res.json());
  }

  delete(id: number): Observable<Story> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.delete(environment.apiUrl + `/api/stories/${id}`, { headers: headers })
      .map(res => res.json());
  }
}
