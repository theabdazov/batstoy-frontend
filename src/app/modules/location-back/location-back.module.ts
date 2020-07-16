import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackDirective } from './back.directive';



@NgModule({
  declarations: [BackDirective],
  exports: [
    BackDirective
  ],
  imports: [
    CommonModule
  ]
})
export class LocationBackModule { }
