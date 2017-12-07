import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Photo } from '../models/photo.model';
import { environment } from '../../../environments/environment';
import { PhotosList } from '../models/photos.list.model';
import { AuthHttp } from 'angular2-jwt';
import { Router } from '@angular/router';

interface ImagesComparePayload {
  originalImageId: number,
  modifiedImageId: number,
  resize: boolean,
  boundingRectangles: boolean
}

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
    console.log(JSON.stringify(photo));
    return this.authHttp.post(environment.apiUrl + `/api/stories/${photo.storyNumber}/photos`, JSON.stringify(photo))
      .subscribe(
        (res) => res.json(),
        (err) => this.router.navigate(['/error']));
  }

  delete(photoNumber: number, storyNumber: number) {
    return this.authHttp.delete(environment.apiUrl + `/api/stories/${storyNumber}/photos/${photoNumber}`)
      .subscribe(
        (res) => console.log('deleted'),
        (err) => this.router.navigate(['/error']));
  }

  update(photo: Photo) {
    return this.authHttp.put(environment.apiUrl + `/api/stories/${photo.storyNumber}/photos/${photo.photoNumber}`, JSON.stringify(photo))
      .subscribe(
        (res) => res.json(),
        (err) => this.router.navigate(['/error']));
  }

  /**
   * Returns Observable of base64 encoded image
   * @param {number} originalPhotoId
   * @param {number} modifiedPhotoId
   * @returns {Observable<string>}
   */
  compare(originalPhotoId: number, modifiedPhotoId: number): Observable<string> {
    const payload: ImagesComparePayload = {
      originalImageId: originalPhotoId,
      modifiedImageId: modifiedPhotoId,
      // @TODO add this options from checkbox in popup
      resize: false,
      boundingRectangles: false
    };
    console.log('compare payload: ' + JSON.stringify(payload));
    return this.authHttp.post(environment.apiUrl + '/api/images-compare', JSON.stringify(payload))
      .map((res) => res.json());
  }
}
