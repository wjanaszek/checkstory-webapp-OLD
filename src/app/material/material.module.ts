import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatProgressSpinnerModule, MatTabsModule,
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
  ],
  declarations: []
})
export class MaterialModule { }
