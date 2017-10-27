export class Photo {
  photoNumber: number;
  storyNumber: number;
  owner_id: number;
  originalPhoto: string;
  createDate: string;
  updateDate: string;
  imageType: string;
  content: string;

  constructor(storyNumber?: number, owner_id?: number, originalPhoto?: string, createDate?: string, updateDate?: string, imageType?: string, content?: string) {
    this.storyNumber = storyNumber;
    this.owner_id = owner_id;
    this.originalPhoto = originalPhoto;
    this.createDate = createDate;
    this.updateDate = updateDate;
    this.imageType = imageType;
    this.content = content;
  }
}
