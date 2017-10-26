import { Injectable } from '@angular/core';
import { Story } from '../models/story.model';
import { Headers, Http, URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { jwt } from '../jwt.headers';

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
    return this.http.get(environment.apiUrl + `/api/stories/${id}`, { headers: headers, params: requestParam })
      .map(res => res.json());
  }

  delete(id: number) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.delete(environment.apiUrl + `/api/stories/${id}`, { headers: headers })
      .map(res => res.json());
  }

  update(story: Story): Observable<Story> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log('story to update: ' + JSON.stringify(story));
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    story.owner = currentUser;
    story.longitude = Number(story.longitude);
    console.log('story to update: ' + JSON.stringify(story));
    return this.http.put(environment.apiUrl + `/api/stories/${story.id}`, JSON.stringify(story), { headers: headers })
      .map(res => res.json());
  }

  add(story: Story) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log('sending: ' + JSON.stringify({
      title: story.title,
      notes: story.notes,
      latitude: story.latitude,
      longitude: story.longitude,
      createDate: story.createDate,
      owner: currentUser,
      photos: []
    }));
    return this.http.post(environment.apiUrl + '/api/stories', JSON.stringify({
      title: story.title,
      notes: story.notes,
      latitude: story.latitude,
      longitude: story.longitude,
      createDate: story.createDate,
      owner: currentUser,
      photos: []
    }), jwt())
      .map((response: Response) => {
        const storyFromResponse = response.json();
        return storyFromResponse;
      });
  }
}
