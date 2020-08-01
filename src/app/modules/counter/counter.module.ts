import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterComponent } from './counter.component';
import {NzIconModule} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [CounterComponent],
  exports: [
    CounterComponent
  ],
  imports: [
    CommonModule,
    NzIconModule,
    FormsModule
  ]
})
export class CounterModule { }
