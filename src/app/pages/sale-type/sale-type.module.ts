import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaleTypeRoutingModule } from './sale-type-routing.module';
import { SaleTypeControlComponent } from './sale-type-control/sale-type-control.component';
import { SaleTypeCreateUpdateComponent } from './sale-type-create-update/sale-type-create-update.component';
import {NzButtonModule, NzFormModule, NzInputModule, NzTableModule} from 'ng-zorro-antd';
import {ReactiveFormsModule} from '@angular/forms';
import {LocationBackModule} from '../../modules/location-back/location-back.module';
import {ValidatePipeModule} from '../../modules/validate-pipe/validate-pipe.module';


@NgModule({
  declarations: [SaleTypeControlComponent, SaleTypeCreateUpdateComponent],
  imports: [
    CommonModule,
    SaleTypeRoutingModule,
    NzButtonModule,
    NzTableModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    LocationBackModule,
    ValidatePipeModule
  ]
})
export class SaleTypeModule { }
