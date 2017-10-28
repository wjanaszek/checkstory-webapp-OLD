import { User } from './user.model';
import { Photo } from './photo.model';

export class Story {
  id: number;
  title: string;
  notes: string;
  latitude: number;
  longitude: number;
  createDate: string;
  owner: User;
  photos: Photo[] = [];

  constructor(title?: string, notes?: string, latitude?: number, longitude?: number, createDate?: string, owner?: User) {
    this.title = title;
    this.notes = notes;
    this.latitude = latitude;
    this.longitude = longitude;
    this.createDate = createDate;
    this.owner = owner;
  }

  containsOriginalPhoto(): boolean {
    const searchedPhoto = new Photo();
    searchedPhoto.originalPhoto = 't';
    return this.photos.indexOf(searchedPhoto) !== -1 ? true : false;
  }
}
