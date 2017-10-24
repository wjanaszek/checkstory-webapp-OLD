import { Component, OnInit } from '@angular/core';
import { StoriesService } from '../../shared/services/stories.service';
import { Story } from '../../shared/models/story.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogsService } from '../../shared/services/dialogs.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-story-detail',
  templateUrl: './story-detail.component.html'
})
export class StoryDetailComponent implements OnInit {

  story: Story;
  editing: boolean;
  storyDetailForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dialogsService: DialogsService,
              private fb: FormBuilder,
              private storiesService: StoriesService) {
    this.editing = false;
    this.story = new Story();
  }

  ngOnInit() {
    this.route.params.subscribe(params => this.story.id = +params['id']);
    this.storiesService.getById(this.story.id).subscribe(story => {
      this.story = story;
      this.initFormAndSetValues();
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

  private initFormAndSetValues() {
    this.storyDetailForm = this.fb.group({
      title: [this.story.title],
      description: [this.story.description],
      latitude: [this.story.latitude],
      longitude: [this.story.longitude],
      startDate: [this.story.startDate]
    });
  }
}
