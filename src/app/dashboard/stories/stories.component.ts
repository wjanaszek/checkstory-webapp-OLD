import { Component, OnInit } from '@angular/core';
import { StoriesService } from '../../services/stories.service';
import { Story } from '../../models/story.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html'
})
export class StoriesComponent implements OnInit {

  //TODO implement this in the future with service
  stories: Story[];
  selectedStory: Story;

  constructor(private storiesService: StoriesService,
              private router: Router) { }

  ngOnInit() {
    this.stories = this.storiesService.getAll();
    this.selectedStory = null;
  }

  private goToStoryDetails(id: number) {
    this.router.navigate(['/dashboard/story-details', id]);
  }
}
