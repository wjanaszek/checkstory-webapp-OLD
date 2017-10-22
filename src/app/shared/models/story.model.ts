export class Story {
  id: number;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  startDate: string;

  constructor(id?: number, title?: string, description?: string, latitude?: number, longitude?: number, startDate?: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.latitude = latitude;
    this.longitude = longitude;
    this.startDate = startDate;
  }
}
