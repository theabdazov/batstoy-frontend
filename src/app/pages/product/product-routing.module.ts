import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductControlComponent} from './product-control/product-control.component';
import {ProductCreateUpdateComponent} from './product-create-update/product-create-update.component';


const routes: Routes = [
  {path: 'control', component: ProductControlComponent},
  {path: 'create', component: ProductCreateUpdateComponent},
  {path: 'update/:id', component: ProductCreateUpdateComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
