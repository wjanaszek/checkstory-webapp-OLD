import { Component, OnInit, Inject } from '@angular/core';
import { StoriesService } from '../../shared/services/stories.service';
import { Story } from '../../shared/models/story.model';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { User } from '../../shared/models/user.model';
import { DialogsService } from '../../shared/services/dialogs.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html'
})
export class StoriesComponent implements OnInit {

  user: User;
  stories: Observable<Story[]>;
  selectedStory: Story;

  constructor(private storiesService: StoriesService,
              private router: Router,
              private dialog: MatDialog,
              private dialogsService: DialogsService) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.stories = this.storiesService.getAll();
    this.selectedStory = null;
  }

  goToStoryDetails(id: number) {
    this.router.navigate(['/dashboard/story-details', id]);
  }

  openAddStoryDialog() {
    const dialogRef = this.dialog.open(AddStoryDialogComponent, {
      data: this.addStory.bind(this)
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

  addStory(event) {
    this.storiesService.add(event);
  }
}

@Component({
  templateUrl: './add.story.dialog.component.html'
})
export class AddStoryDialogComponent {

  addStoryForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddStoryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder) {
    this.addStoryForm = this.fb.group({
      title: ['', [Validators.required]],
      notes: [''],
      latitude: ['', [Validators.required]],
      longitude: ['', [Validators.required]],
      createDate: ['']
    });
  }

  addStory() {
    console.log('add dialog');
    this.data(new Story(
      this.addStoryForm.get('title').value,
      this.addStoryForm.get('notes').value,
      this.addStoryForm.get('latitude').value,
      this.addStoryForm.get('longitude').value,
      this.addStoryForm.get('createDate').value
      )
    );
  }
}
