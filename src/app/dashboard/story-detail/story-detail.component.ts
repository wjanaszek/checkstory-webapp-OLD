import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StoriesService } from '../../shared/services/stories.service';
import { Story } from '../../shared/models/story.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogsService } from '../../shared/services/dialogs.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhotosService } from '../../shared/services/photos.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { Photo } from '../../shared/models/photo.model';

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
              private storiesService: StoriesService,
              private photosService: PhotosService,
              public dialog: MatDialog) {
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

  openAddPhotoDialog(story: Story) {
    this.dialog.open(AddPhotoDialogComponent, {
      data: {
        addPhoto: this.addPhoto.bind(this),
        isOriginal: this.containsOriginalPhoto,
        storyNumber: this.story.id,
        owner_id: this.story.owner.id
      }
    });
  }

  private initFormAndSetValues() {
    this.storyDetailForm = this.fb.group({
      title: [this.story.title],
      notes: [this.story.notes],
      latitude: [this.story.latitude],
      longitude: [this.story.longitude],
      createDate: [this.story.createDate]
    });
  }

  private addPhoto(event) {
    this.photosService.create(event);
    console.log(JSON.stringify(event));
  }

  private containsOriginalPhoto(): boolean {
    const searchedPhoto = new Photo();
    searchedPhoto.originalPhoto = 't';
    return this.story.photos.indexOf(searchedPhoto) !== -1 ? true : false;
  }
}

@Component({
  templateUrl: './add.photo.dialog.component.html'
})
export class AddPhotoDialogComponent {

  addPhotoForm: FormGroup;
  loading: boolean = false;

  @ViewChild('fileInput')
  fileInput: ElementRef;

  constructor(public dialogRef: MatDialogRef<AddPhotoDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) {
    this.addPhotoForm = this.fb.group({
      photo: null,
      createDate: [''],
      originalPhoto: [data.isOriginal],
    });
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.addPhotoForm.get('photo').setValue({
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
      'false',
      // this.addPhotoForm.get('originalPhoto').value,
      // this.addPhotoForm.get('photo').value.createDate,
  ﻿   '2017-10-21 00:00:00',
      null,
      this.addPhotoForm.get('photo').value.type,
      this.addPhotoForm.get('photo').value.content
    ));
  }

  clearFile() {
    this.addPhotoForm.get('photo').setValue(null);
    this.fileInput.nativeElement.value = '';
  }
}
