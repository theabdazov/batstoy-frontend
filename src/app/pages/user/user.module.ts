import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {UserControlComponent} from './user-control/user-control.component';
import {UserCreateUpdateComponent} from './user-create-update/user-create-update.component';
import {NzButtonModule, NzFormModule, NzIconModule, NzInputModule, NzPaginationModule, NzSelectModule, NzTableModule} from 'ng-zorro-antd';
import {ReactiveFormsModule} from '@angular/forms';
import {LocationBackModule} from '../../modules/location-back/location-back.module';
import {ValidatePipeModule} from '../../modules/validate-pipe/validate-pipe.module';


@NgModule({
  declarations: [UserControlComponent, UserCreateUpdateComponent],
  imports: [
    CommonModule,
    NzPaginationModule,
    NzButtonModule,
    UserRoutingModule,
    NzTableModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzSelectModule,
    LocationBackModule,
    ValidatePipeModule,
    NzIconModule,
  ]
})
export class UserModule {
}
