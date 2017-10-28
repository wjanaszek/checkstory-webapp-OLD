import { Component, Input, OnInit } from '@angular/core';
import { Photo } from '../../../shared/models/photo.model';
import { ActivatedRoute } from '@angular/router';
import { PhotosService } from '../../../shared/services/photos.service';
import { PhotosList } from '../../../shared/models/photos.list.model';
import { DialogsService } from '../../../shared/services/dialogs.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html'
})
export class PhotoListComponent implements OnInit {

  storyPhotos: Photo[] = [];
  storyId: number;

  constructor(private route: ActivatedRoute,
              private photosService: PhotosService,
              private dialogsService: DialogsService) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.storyId = +params['id']);
    this.photosService.getAll(this.storyId).subscribe(data => {
      this.prepareImages(data);
    });
  }

  editPhoto(photo: Photo) {

  }

  openRemovePhotoDialog(photo: Photo) {
    this.dialogsService
      .confirm('Remove', 'Are you sure you want remove this photo?', 'Yes', 'No')
      .subscribe(result => {
        if (result === true) {
          this.photosService.delete(photo.photoNumber, photo.storyNumber);
        }
      });
  }

  private prepareImages(data: PhotosList) {
    for (const p of data.photos) {
      this.storyPhotos.push(p);
    }
  }
}
