import { Photo } from './photo.model';

export class PhotosList {
  photos: Photo[];

  constructor(photos: Photo[]) {
    this.photos = photos;
  }
}
