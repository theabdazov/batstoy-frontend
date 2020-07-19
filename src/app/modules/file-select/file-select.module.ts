import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileSelectComponent } from './file-select.component';
import {FormsModule} from '@angular/forms';
import {NzIconModule, NzInputModule} from 'ng-zorro-antd';


@NgModule({
  declarations: [FileSelectComponent],
  exports: [FileSelectComponent],
  imports: [
    CommonModule,
    FormsModule,
    NzInputModule,
    NzIconModule
  ]
})
export class FileSelectModule { }
