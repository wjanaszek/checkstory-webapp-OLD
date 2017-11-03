import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { StoriesService } from '../../shared/services/stories.service';
import { Story } from '../../shared/models/story.model';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { User } from '../../shared/models/user.model';
import { DialogsService } from '../../shared/services/dialogs.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Photo } from '../../shared/models/photo.model';
import { PhotosService } from '../../shared/services/photos.service';

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
              private photosService: PhotosService) {
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
      data: {
        addStory: this.addStory.bind(this)
      }
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

  getOriginalStoryPhoto(story: Story): Photo {
    const searchedPhoto = new Photo();
    searchedPhoto.originalPhoto = 't';
    let photos: Photo[];
    this.photosService.getAll(story.id).subscribe(data => {
      photos = data.photos;
      const index = photos.indexOf(searchedPhoto);
      if (index !== -1) {
        return photos[index];
      } else {
        return null;
      }
    });
    return null;
  }
}

@Component({
  templateUrl: './add.story.dialog.component.html'
})
export class AddStoryDialogComponent {

  addStoryForm: FormGroup;
  loading: boolean;

  @ViewChild('fileInput')
  fileInput: ElementRef;

  constructor(public dialogRef: MatDialogRef<AddStoryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder) {
    this.loading = false;
    this.addStoryForm = this.fb.group({
      title: ['', [Validators.required]],
      notes: [''],
      latitude: ['', [Validators.required]],
      longitude: ['', [Validators.required]],
      createDate: [''],
      photo: null
    });
  }

  addStory() {
    console.log('add dialog');
    const storyToSave = new Story(
      this.addStoryForm.get('title').value,
      this.addStoryForm.get('notes').value,
      this.addStoryForm.get('latitude').value,
      this.addStoryForm.get('longitude').value,
      this.addStoryForm.get('createDate').value
    );
    if (this.addStoryForm.get('photo').value !== null) {
      storyToSave.photos.push(new Photo());
    }
    this.data.addStory(storyToSave);
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.addStoryForm.get('photo').setValue({
          type: file.type.split('/')[1],
          size: file.size,
          createDate: file.createDate,
          content: reader.result.split(',')[1]
        });
      };
    }
  }

  upload() {
    this.loading = true;
    this.data.addPhoto(new Photo(
      this.data.storyNumber,
      this.data.owner_id,
      'true',
    // `${this.addStoryForm.get('isOriginal').value}`,
    // this.addPhotoForm.get('originalPhoto').value,
    // this.addPhotoForm.get('photo').value.createDate,
  ﻿   '2017-10-21 00:00:00',
      null,
      this.addStoryForm.get('photo').value.type,
      this.addStoryForm.get('photo').value.content
  ));
    this.dialogRef.close();
  }

  clearFile() {
    this.addStoryForm.get('photo').setValue(null);
    this.fileInput.nativeElement.value = '';
  }
}
