import { Injectable } from '@angular/core';
import { Story } from '../models/story.model';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class StoriesService {

  constructor(private http: Http) { }

  getAll(): Observable<Story[]> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('userId', currentUser.id);
    return this.http.get(environment.apiUrl + '/api/stories', { headers: headers })
      .map(res => res.json());
  }

  getById(id: number): Observable<Story> {
    return this.http.get(environment.apiUrl + `api/stories/${id}`)
      .map(res => res.json());
  }
}
