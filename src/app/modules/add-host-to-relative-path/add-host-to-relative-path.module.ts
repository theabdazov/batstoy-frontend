import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddHostToRelativePathPipe } from './add-host-to-relative-path.pipe';



@NgModule({
  declarations: [AddHostToRelativePathPipe],
  imports: [
    CommonModule
  ],
  exports: [AddHostToRelativePathPipe]
})
export class AddHostToRelativePathModule { }
