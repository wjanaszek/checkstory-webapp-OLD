import { Component, Input, OnInit } from '@angular/core';
import { Photo } from '../../../shared/models/photo.model';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html'
})
export class PhotoListComponent implements OnInit {

  @Input()
  storyPhotos: Photo[];

  constructor() { }

  ngOnInit() {
  }

}
