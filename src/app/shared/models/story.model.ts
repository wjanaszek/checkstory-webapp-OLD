import { User } from './user.model';
import { Photo } from './photo.model';

export class Story {
  id: number;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  startDate: string;
  owner: User;
  photos: Photo[] = [];

  constructor(title?: string, description?: string, latitude?: number, longitude?: number, startDate?: string, owner?: User) {
    this.title = title;
    this.description = description;
    this.latitude = latitude;
    this.longitude = longitude;
    this.startDate = startDate;
    this.owner = owner;
  }
}
