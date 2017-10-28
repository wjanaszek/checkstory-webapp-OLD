import { Component, OnInit } from '@angular/core';
import { StoriesService } from '../../shared/services/stories.service';
import { Story } from '../../shared/models/story.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogsService } from '../../shared/services/dialogs.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PhotosService } from '../../shared/services/photos.service';
import { Photo } from '../../shared/models/photo.model';
import { Observable } from 'rxjs/Observable';
import { PhotosList } from '../../shared/models/photos.list.model';

@Component({
  selector: 'app-story-detail',
  templateUrl: './story-detail.component.html'
})
export class StoryDetailComponent implements OnInit {

  story: Story;
  editing: boolean;
  storyDetailForm: FormGroup;
  photos$: Observable<PhotosList>;
  storyPhotos: Photo[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dialogsService: DialogsService,
              private fb: FormBuilder,
              private storiesService: StoriesService,
              private photosService: PhotosService) {
    this.editing = false;
    this.story = new Story();
  }

  ngOnInit() {
    this.route.params.subscribe(params => this.story.id = +params['id']);
    this.storiesService.getById(this.story.id).subscribe(story => {
      this.story = story;
      this.initFormAndSetValues();
    });
    this.photos$ = this.photosService.getAll(this.story.id);
    this.photos$.subscribe(data => {
      this.prepareImages(data);
    });
  }

  editStory(id: number) {
    this.router.navigate(['/dashboard/story-details', id, 'edit']);
  }

  openRemoveStoryDialog(story: Story) {
    this.dialogsService
      .confirm('Remove', `Are you sure you want to remove story \"${story.title}\"`, 'Yes', 'No')
      .subscribe(result => {
        if (result === true) {
          this.storiesService.delete(story.id);
        }
      });
  }

  addPhoto(story: Story) {

  }

  private initFormAndSetValues() {
    this.storyDetailForm = this.fb.group({
      title: [this.story.title],
      notes: [this.story.notes],
      latitude: [this.story.latitude],
      longitude: [this.story.longitude],
      createDate: [this.story.createDate]
    });
  }

  private prepareImages(data: PhotosList) {
    for (const p of data.photos) {
      this.storyPhotos.push(p);
    }
  }
}
