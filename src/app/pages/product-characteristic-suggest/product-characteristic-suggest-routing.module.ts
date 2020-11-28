import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductCharacteristicSuggestControlComponent} from './product-characteristic-suggest-control/product-characteristic-suggest-control.component';


const routes: Routes = [
  {path: 'control', component: ProductCharacteristicSuggestControlComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductCharacteristicSuggestRoutingModule { }
