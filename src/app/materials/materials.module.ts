import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdButtonModule, MdFormFieldModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdButtonModule,
    MdFormFieldModule
  ],
  exports: [
    MdButtonModule,
    MdFormFieldModule
  ],
  declarations: []
})
export class MaterialsModule { }
