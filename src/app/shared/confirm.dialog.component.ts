import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  templateUrl: './confirm.dialog.component'
})
export class ConfirmDialogComponent {

  title: string;
  message: string;
  confirmText: string;
  cancelText: string;

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) {  }
}
