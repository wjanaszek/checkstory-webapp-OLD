import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Photo } from '../../../shared/models/photo.model';
import { ActivatedRoute } from '@angular/router';
import { PhotosService } from '../../../shared/services/photos.service';
import { PhotosList } from '../../../shared/models/photos.list.model';
import { DialogsService } from '../../../shared/services/dialogs.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html'
})
export class PhotoListComponent implements OnInit {

  storyPhotos: Photo[] = [];
  storyId: number;

  constructor(private route: ActivatedRoute,
              private photosService: PhotosService,
              private dialogsService: DialogsService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.storyId = +params['id']);
    this.photosService.getAll(this.storyId).subscribe(data => {
      this.prepareImages(data);
    });
  }

  openEditPhotoDialog(photo: Photo) {
    this.dialog.open(EditPhotoDialogComponent, {
      data: {
        updatePhoto: this.updatePhoto.bind(this),
        isOriginal: photo.originalPhoto === 't' ? true : false,
        photo: photo
      }
    });
  }

  openRemovePhotoDialog(photo: Photo) {
    this.dialogsService
      .confirm('Remove', 'Are you sure you want remove this photo?', 'Yes', 'No')
      .subscribe(result => {
        if (result === true) {
          this.photosService.delete(photo.photoNumber, photo.storyNumber);
        }
      });
  }

  openBigPhoto(photo: Photo) {
    this.dialog.open(PhotoViewDialogComponent, {
      data: photo
    });
  }

  private updatePhoto(event) {
    this.photosService.update(event);
  }

  private prepareImages(data: PhotosList) {
    for (const p of data.photos) {
      this.storyPhotos.push(p);
    }
  }
}

@Component({
  templateUrl: './edit.photo.dialog.component.html'
})
export class EditPhotoDialogComponent {

  editPhotoForm: FormGroup;
  loading: boolean;

  @ViewChild('fileInput')
  fileInput: ElementRef;

  constructor(public dialogRef: MatDialogRef<EditPhotoDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) {
    this.editPhotoForm = this.fb.group({
      photo: data.photo,
      updatePhoto: null,
      createDate: [''],
      isOriginal: [data.isOriginal],
    });
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.editPhotoForm.get('updatePhoto').setValue({
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
    const toUpdate: Photo = new Photo(this.data.photo.storyNumber,
      this.data.photo.owner_id,
      `${this.editPhotoForm.get('isOriginal').value}`,
    // this.addPhotoForm.get('originalPhoto').value,
    // this.addPhotoForm.get('photo').value.createDate,
  ﻿   '2017-10-21 00:00:00',
      null);
    if (this.editPhotoForm.get('updatePhoto').value === null) {
      toUpdate.imageType = this.data.photo.imageType;
      toUpdate.content = this.data.photo.content;
    } else {
      toUpdate.imageType = this.editPhotoForm.get('updatePhoto').value.type;
      toUpdate.content = this.editPhotoForm.get('updatePhoto').value.content;
    }
    toUpdate.photoNumber = this.data.photo.photoNumber;
    this.data.updatePhoto(toUpdate);
    this.dialogRef.close();
  }

  clearFile() {
    this.editPhotoForm.get('updatePhoto').setValue(null);
    this.fileInput.nativeElement.value = '';
  }
}

@Component({
  templateUrl: './photo.view.dialog.component.html'
})
export class PhotoViewDialogComponent {

  photo: Photo;

  constructor(public dialogRef: MatDialogRef<PhotoViewDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.photo = data;
  }
}
