import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductControlComponent } from './product-control/product-control.component';
import { ProductCreateUpdateComponent } from './product-create-update/product-create-update.component';
import {
  NzButtonModule,
  NzFormModule, NzIconModule,
  NzInputModule, NzModalModule,
  NzSelectModule,
  NzTableModule,
  NzTreeSelectModule,
  NzUploadModule
} from 'ng-zorro-antd';
import {ReactiveFormsModule} from '@angular/forms';
import {LocationBackModule} from '../../modules/location-back/location-back.module';
import {ValidatePipeModule} from '../../modules/validate-pipe/validate-pipe.module';
import { ImagesUploadComponent } from './images-upload/images-upload.component';


@NgModule({
  declarations: [ProductControlComponent, ProductCreateUpdateComponent, ImagesUploadComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    NzButtonModule,
    NzTableModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzTreeSelectModule,
    NzSelectModule,
    LocationBackModule,
    ValidatePipeModule,
    NzUploadModule,
    NzIconModule,
    NzModalModule
  ]
})
export class ProductModule { }