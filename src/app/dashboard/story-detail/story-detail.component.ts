import { Component, OnInit } from '@angular/core';
import { StoriesService } from '../../shared/services/stories.service';
import { Story } from '../../shared/models/story.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-story-detail',
  templateUrl: './story-detail.component.html'
})
export class StoryDetailComponent implements OnInit {

  story: Story;
  editing: boolean;

  constructor(private route: ActivatedRoute,
              private storiesService: StoriesService) {
    this.editing = false;
  }

  ngOnInit() {
    this.route.params.subscribe(params => this.story.id = +params['id']);
    this.storiesService.getById(this.story.id).subscribe(story => this.story = story);
  }
}
