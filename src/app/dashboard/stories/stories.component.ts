import { Component, OnInit, Inject } from '@angular/core';
import { StoriesService } from '../../shared/services/stories.service';
import { Story } from '../../shared/models/story.model';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { User } from '../../shared/models/user.model';
import { DialogsService } from '../../shared/services/dialogs.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { NgProgressService } from 'ngx-progressbar';
import { ComponentCommunicationService } from '../../shared/services/component-communication.service';

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
              private dialogsService: DialogsService,
              private componentsCommunicationService: ComponentCommunicationService,
              public progressService: NgProgressService) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.progressService.start();
    this.stories = this.storiesService.getAll();
    this.storiesService.getAll().subscribe(res => this.progressService.done());
    this.selectedStory = null;
  }

  goToStoryDetails(story: Story) {
    this.router.navigate(['/dashboard/story-details', story.id]);
    this.componentsCommunicationService.sendData(story);
  }

  openAddStoryDialog() {
    const dialogRef = this.dialog.open(AddStoryDialogComponent, {
      data: this.addStory.bind(this)
    });
  }

  editStory(story: Story) {
    this.router.navigate(['/dashboard/story-details', story.id, 'edit']);
    this.componentsCommunicationService.sendData(story);
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
    console.log('adding: ' + JSON.stringify(event));
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
      description: [''],
      latitude: ['', [Validators.required]],
      longitude: ['', [Validators.required]],
      startDate: ['']
    });
  }

  addStory() {
    console.log('add dialog');
    this.data(new Story(
      this.addStoryForm.get('title').value,
      this.addStoryForm.get('description').value,
      this.addStoryForm.get('latitude').value,
      this.addStoryForm.get('longitude').value,
      this.addStoryForm.get('startDate').value
      )
    );
  }
}
