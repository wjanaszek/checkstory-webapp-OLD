import { Component, OnInit, Inject } from '@angular/core';
import { StoriesService } from '../../shared/services/stories.service';
import { Story } from '../../shared/models/story.model';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { User } from '../../shared/models/user.model';
import { DialogsService } from '../../shared/services/dialogs.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html'
})
export class StoriesComponent implements OnInit {

  user: User;
  stories: Story[] = [];
  selectedStory: Story;

  constructor(private storiesService: StoriesService,
              private router: Router,
              private dialog: MatDialog,
              private dialogsService: DialogsService) {
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
    const dialogRef = this.dialog.open(AddStoryDialogComponent, {
      data: this.addStory.bind(this)
    });
  }

  editStory(id: number) {
    this.router.navigate(['/dashboard/story-details', id]);
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

  private addStory(story: Story) {
    this.storiesService.addStory(story);
  }
}

@Component({
  templateUrl: './dialogs/add.story.dialog.component.html'
})
export class AddStoryDialogComponent {

  addStoryForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddStoryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder) {
    this.addStoryForm = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
      latitude: ['', [Validators.required]],
      longitude: ['', [Validators.required]],
      startDate: ['']
    });
  }
}
