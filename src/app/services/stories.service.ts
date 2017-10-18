import { Injectable } from '@angular/core';
import { Story } from '../models/story.model';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

// TODO remove this mock
export const STORIES: Story[] = [
  { id: 1, url: 'https://www.google.pl/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwiquMWVlvPWAhUBZlAKHRgnCzcQjRwIBw&url=http%3A%2F%2Fbesidelogic.com%2F%3Fproject%3Dprzykladowe-ujecia-z-lotu-ptaka&psig=AOvVaw0xQaQMaXhVJht1WAp6F5m5&ust=1508175625599866'},
  { id: 2, url: 'https://www.google.pl/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwjxosWklvPWAhXRYlAKHbLRCFMQjRwIBw&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DOB8NrlLyuE4&psig=AOvVaw0xQaQMaXhVJht1WAp6F5m5&ust=1508175625599866'}
];

@Injectable()
export class StoriesService {

  constructor(private http: Http) { }

  private stories = STORIES;

  getAll(): Story[] {
    return this.stories;
  }

  getById(id: number): Observable<Story> {
    return this.http.get(`api/stories/${id}`)
      .map(res => res.json());
  }
}
