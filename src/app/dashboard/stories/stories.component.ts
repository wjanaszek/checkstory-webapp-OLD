import { Component, OnInit } from '@angular/core';
import { StoriesService } from '../../shared/services/stories.service';
import { Story } from '../../shared/models/story.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html'
})
export class StoriesComponent implements OnInit {

  stories: Story[];
  selectedStory: Story;

  constructor(private storiesService: StoriesService,
              private router: Router) { }

  ngOnInit() {
    this.storiesService.getAll()
      .subscribe(stories => this.stories = stories);
    this.selectedStory = null;
  }

  private goToStoryDetails(id: number) {
    this.router.navigate(['/dashboard/story-details', id]);
  }

  openAddStoryDialog() {

  }
}
