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

  constructor(title?: string, notes?: string, latitude?: number, longitude?: number, createDate?: string, owner?: User, photos?: Photo[]) {
    this.title = title;
    this.notes = notes;
    this.latitude = latitude;
    this.longitude = longitude;
    this.createDate = createDate;
    this.owner = owner;
    this.photos = photos;
  }
}
