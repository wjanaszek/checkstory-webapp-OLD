import { Component, Input, OnInit } from '@angular/core';
import { Photo } from '../../../shared/models/photo.model';
import { ActivatedRoute } from '@angular/router';
import { PhotosService } from '../../../shared/services/photos.service';
import { PhotosList } from '../../../shared/models/photos.list.model';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html'
})
export class PhotoListComponent implements OnInit {

  storyPhotos: Photo[] = [];
  storyId: number;

  constructor(private route: ActivatedRoute,
              private photosService: PhotosService) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.storyId = +params['id']);
    this.photosService.getAll(this.storyId).subscribe(data => {
      this.prepareImages(data);
    });
  }

  private prepareImages(data: PhotosList) {
    for (const p of data.photos) {
      this.storyPhotos.push(p);
    }
  }
}
