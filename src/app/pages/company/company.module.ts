import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyControlComponent } from './company-control/company-control.component';
import { CompanyCreateUpdateComponent } from './company-create-update/company-create-update.component';
import {NzButtonModule, NzFormModule, NzInputModule, NzTableModule} from 'ng-zorro-antd';
import {ReactiveFormsModule} from '@angular/forms';
import {LocationBackModule} from '../../modules/location-back/location-back.module';
import {ValidatePipeModule} from '../../modules/validate-pipe/validate-pipe.module';


@NgModule({
  declarations: [CompanyControlComponent, CompanyCreateUpdateComponent],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    NzButtonModule,
    NzTableModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    LocationBackModule,
    ValidatePipeModule
  ]
})
export class CompanyModule { }
