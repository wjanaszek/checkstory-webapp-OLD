import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatProgressSpinnerModule, MatSlideToggleModule,
  MatTabsModule,
  MatToolbarModule, MatTooltipModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatListModule,
    MatDialogModule,
    MatToolbarModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatListModule,
    MatDialogModule,
    MatToolbarModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule
  ],
  declarations: []
})
export class MaterialModule { }
