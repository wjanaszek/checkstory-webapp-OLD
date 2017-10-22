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
    this.storiesService.getById(this.story.id).subscribe(story => this.story = story);
  }

  ngOnInit() {
    this.editStoryForm = this.fb.group({
      title: [this.story.title, [Validators.required]],
      description: [this.story.description],
      latitude: [this.story.latitude, [Validators.required]],
      longitude: [this.story.longitude, [Validators.required]],
      startDate: [this.story.startDate]
    });
  }

  update() {
    const storyToUpdate = this.loadDataFromFormToStory();
    this.storiesService.update(this.story);
    this.router.navigate(['/dashboard/story-list', this.story.id]);
  }

  goBack() {
    this.router.navigate(['/dashboard/story-list']);
  }

  private loadDataFromFormToStory(): Story {
    if (this.editStoryForm.get('title').value !== this.story.title) {
      this.story.title = this.editStoryForm.get('title').value;
    }
    if (this.editStoryForm.get('description').value !== this.story.description) {
      this.story.description = this.editStoryForm.get('description').value;
    }
    if (this.editStoryForm.get('latitude').value !== this.story.latitude) {
      this.story.latitude = this.editStoryForm.get('latitude').value;
    }
    if (this.editStoryForm.get('longitude').value !== this.story.longitude) {
      this.story.longitude = this.editStoryForm.get('longitude').value;
    }
    if (this.editStoryForm.get('startDate').value !== this.story.startDate) {
      this.story.startDate = this.editStoryForm.get('startDate').value;
    }
    return this.story;
  }
}
