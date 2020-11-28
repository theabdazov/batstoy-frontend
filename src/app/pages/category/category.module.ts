import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CategoryRoutingModule} from './category-routing.module';
import {CategoryControlComponent} from './category-control/category-control.component';
import {CategoryCreateUpdateComponent} from './category-create-update/category-create-update.component';
import {
  NzButtonModule,
  NzDropDownModule,
  NzFormModule,
  NzIconModule,
  NzInputModule,
  NzModalModule,
  NzTableModule,
  NzTreeModule
} from 'ng-zorro-antd';
import {ReactiveFormsModule} from '@angular/forms';
import {FileSelectModule} from '../../modules/file-select/file-select.module';
import {ValidatePipeModule} from '../../modules/validate-pipe/validate-pipe.module';


@NgModule({
  declarations: [
    CategoryControlComponent,
    CategoryCreateUpdateComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    NzButtonModule,
    NzTreeModule,
    NzModalModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    FileSelectModule,
    ValidatePipeModule,
    NzIconModule,
    NzDropDownModule,
    NzTableModule
  ]
})
export class CategoryModule {
}
