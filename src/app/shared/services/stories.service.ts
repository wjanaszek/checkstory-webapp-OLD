import { Injectable } from '@angular/core';
import { Story } from '../models/story.model';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { AuthHttp} from 'angular2-jwt';

@Injectable()
export class StoriesService {

  constructor(private authHttp: AuthHttp) { }

  getAll(): Observable<Story[]> {
    return this.authHttp.get(environment.apiUrl + '/api/stories')
      .map(res => res.json());
  }

  getById(id: number): Observable<Story> {
    return this.authHttp.get(environment.apiUrl + `/api/stories/${id}`)
      .map(res => res.json());
  }

  delete(id: number) {
    return this.authHttp.delete(environment.apiUrl + `/api/stories/${id}`)
      .map(res => res.json());
  }

  update(story: Story): Observable<Story> {
    console.log('story to update: ' + JSON.stringify(story));
    return this.authHttp.put(environment.apiUrl + `/api/stories/${story.id}`, JSON.stringify(story))
      .map(res => res.json());
  }

  add(story: Story) {
    console.log('sending: ' + JSON.stringify({
      title: story.title,
      notes: story.notes,
      latitude: story.latitude,
      longitude: story.longitude,
      createDate: story.createDate,
      photos: []
    }));
    return this.authHttp.post(environment.apiUrl + '/api/stories', JSON.stringify({
      title: story.title,
      notes: story.notes,
      latitude: story.latitude,
      longitude: story.longitude,
      createDate: story.createDate,
      photos: []
    }))
      .map((response: Response) => {
        const storyFromResponse = response.json();
        return storyFromResponse;
      });
  }
}
