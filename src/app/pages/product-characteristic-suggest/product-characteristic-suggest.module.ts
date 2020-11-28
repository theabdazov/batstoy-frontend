import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductCharacteristicSuggestRoutingModule} from './product-characteristic-suggest-routing.module';
import {ProductCharacteristicSuggestControlComponent} from './product-characteristic-suggest-control/product-characteristic-suggest-control.component';
import {ProductCharacteristicSuggestCreateUpdateComponent} from './product-characteristic-suggest-create-update/product-characteristic-suggest-create-update.component';
import {NzButtonModule, NzFormModule, NzInputModule, NzModalModule, NzTableModule} from 'ng-zorro-antd';
import {ReactiveFormsModule} from '@angular/forms';
import {ValidatePipeModule} from '../../modules/validate-pipe/validate-pipe.module';


@NgModule({
  declarations: [ProductCharacteristicSuggestControlComponent, ProductCharacteristicSuggestCreateUpdateComponent],
  imports: [
    CommonModule,
    ProductCharacteristicSuggestRoutingModule,
    NzButtonModule,
    NzTableModule,
    NzModalModule,
    NzInputModule,
    NzFormModule,
    ReactiveFormsModule,
    ValidatePipeModule
  ]
})
export class ProductCharacteristicSuggestModule {
}
