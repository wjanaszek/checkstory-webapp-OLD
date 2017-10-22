import { Component, OnInit, Inject } from '@angular/core';
import { StoriesService } from '../../shared/services/stories.service';
import { Story } from '../../shared/models/story.model';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html'
})
export class StoriesComponent implements OnInit {

  user: User;
  stories: Story[] = [];
  selectedStory: Story;

  constructor(private storiesService: StoriesService,
              private router: Router) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

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

  editStory(id: number) {

  }

  openRemoveStoryDialog() {

  }
}

@Component({
  templateUrl: './add.story.dialog.component.html'
})
export class AddStoryDialogComponent {
  constructor(public dialogRef: MatDialogRef<AddStoryDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
}

@Component({
  templateUrl: './remove.story.dialog.component.html'
})
export class RemoveStoryDialogComponent {
  constructor(public dialogRef: MatDialogRef<RemoveStoryDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
}
