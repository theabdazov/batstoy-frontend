import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidatePipe } from './validate.pipe';



@NgModule({
  declarations: [ValidatePipe],
  exports: [
    ValidatePipe
  ],
  imports: [
    CommonModule
  ]
})
export class ValidatePipeModule { }
