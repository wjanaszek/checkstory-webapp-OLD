import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { ConfirmDialogComponent } from '../confirm.dialog.component';

@Injectable()
export class DialogsService {

  constructor(private dialog: MatDialog) { }

  confirm(title: string, message: string, confirmText: string = 'OK', cancelText: string = 'Cancel'): Observable<boolean> {
    let dialogRef: MatDialogRef<ConfirmDialogComponent>;
    dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;
    dialogRef.componentInstance.confirmText = confirmText;
    dialogRef.componentInstance.cancelText = cancelText;
    return dialogRef.afterClosed();
  }
}
