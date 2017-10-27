import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Photo } from '../models/photo.model';
import { environment } from '../../../environments/environment';
import { Http, Headers, URLSearchParams } from '@angular/http';

@Injectable()
export class PhotosService {

  constructor(private http: Http) { }

  getAll(storyNumber: number): Observable<Photo[]> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const requestParam = new URLSearchParams();
    requestParam.append('userId', `${currentUser.id}`);
    return this.http.get(environment.apiUrl + `/api/stories/${storyNumber}/photos`, { headers: headers, params: requestParam })
      .map(res => res.json());
  }

  getById(photoNumber: number, storyNumber: number): Observable<Photo> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + `/api/stories/${storyNumber}/photos/${photoNumber}`, headers)
      .map(res => res.json());
  }

  create(photo: Photo) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.apiUrl + `/api/stories/${photo.storyNumber}/photos`, headers)
      .map(res => res.json());
  }

  delete(photoNumber: number, storyNumber: number) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.delete(environment.apiUrl + `/api/stories/${storyNumber}/photos/${photoNumber}`, headers)
      .map(res => res.json());
  }

  update(photo: Photo): Observable<Photo> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(environment.apiUrl + `/api/stories/${photo.storyNumber}/photos/${photo.photoNumber}`, JSON.stringify(photo), headers)
      .map(res => res.json());
  }
}
