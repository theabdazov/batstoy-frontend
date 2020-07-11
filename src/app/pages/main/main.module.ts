import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import {NzIconModule, NzInputModule} from 'ng-zorro-antd';


@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    NzIconModule,
    NzInputModule
  ]
})
export class MainModule { }
