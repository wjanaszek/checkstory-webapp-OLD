import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Photo } from '../models/photo.model';
import { environment } from '../../../environments/environment';
import { PhotosList } from '../models/photos.list.model';
import { AuthHttp } from 'angular2-jwt';
import { Router } from '@angular/router';

@Injectable()
export class PhotosService {

  constructor(private authHttp: AuthHttp, private router: Router) { }

  getAll(storyNumber: number): Observable<PhotosList> {
    return this.authHttp.get(environment.apiUrl + `/api/stories/${storyNumber}/photos`)
      .map(res => res.json());
  }

  getById(photoNumber: number, storyNumber: number): Observable<Photo> {
    return this.authHttp.get(environment.apiUrl + `/api/stories/${storyNumber}/photos/${photoNumber}`)
      .map(res => res.json());
  }

  create(photo: Photo) {
    return this.authHttp.post(environment.apiUrl + `/api/stories/${photo.storyNumber}/photos`, JSON.stringify(photo))
      .subscribe(
        (res) => res.json(),
        (err) => this.router.navigate(['/error']));
  }

  delete(photoNumber: number, storyNumber: number) {
    return this.authHttp.delete(environment.apiUrl + `/api/stories/${storyNumber}/photos/${photoNumber}`)
      .subscribe(
        (res) => res.json(),
        (err) => this.router.navigate(['/error']));
  }

  update(photo: Photo) {
    return this.authHttp.put(environment.apiUrl + `/api/stories/${photo.storyNumber}/photos/${photo.photoNumber}`, JSON.stringify(photo))
      .subscribe(
        (res) => res.json(),
        (err) => this.router.navigate(['/error']));
  }
}
