import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Story } from '../../../shared/models/story.model';
import { StoriesService } from '../../../shared/services/stories.service';

@Component({
  selector: 'app-story-detail.edit',
  templateUrl: './story-detail.edit.component.html'
})
export class StoryDetailEditComponent implements OnInit {

  editStoryForm: FormGroup;
  story: Story;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private storiesService: StoriesService) {
    this.story = new Story();
    this.route.params.subscribe(params => this.story.id = +params['id']);
  }

  ngOnInit() {
    this.storiesService.getById(this.story.id).subscribe(story => {
      this.story = story;
      this.initForm();
    });
  }

  private initForm() {
    this.editStoryForm = this.fb.group({
      title: [this.story.title, [Validators.required]],
      description: [this.story.notes],
      latitude: [this.story.latitude, [Validators.required]],
      longitude: [this.story.longitude, [Validators.required]],
      startDate: [this.story.createDate]
    });
  }

  update() {
    const storyToUpdate = this.loadDataFromFormToStory();
    this.storiesService.update(this.story);
    this.router.navigate(['/dashboard/story-details', this.story.id]);
  }

  goBack() {
    this.router.navigate(['/dashboard/story-list']);
  }

  private loadDataFromFormToStory(): Story {
    if (this.editStoryForm.get('title').value !== this.story.title) {
      this.story.title = this.editStoryForm.get('title').value;
    }
    if (this.editStoryForm.get('notes').value !== this.story.notes) {
      this.story.notes = this.editStoryForm.get('ntoes').value;
    }
    if (this.editStoryForm.get('latitude').value !== this.story.latitude) {
      this.story.latitude = this.editStoryForm.get('latitude').value;
    }
    if (this.editStoryForm.get('longitude').value !== this.story.longitude) {
      this.story.longitude = this.editStoryForm.get('longitude').value;
    }
    if (this.editStoryForm.get('createDate').value !== this.story.createDate) {
      this.story.createDate = this.editStoryForm.get('createDate').value;
    }
    return this.story;
  }
}
