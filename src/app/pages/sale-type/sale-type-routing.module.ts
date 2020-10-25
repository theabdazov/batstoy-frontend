import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SaleTypeControlComponent} from './sale-type-control/sale-type-control.component';
import {SaleTypeCreateUpdateComponent} from './sale-type-create-update/sale-type-create-update.component';


const routes: Routes = [
  {path: 'control', component: SaleTypeControlComponent},
  {path: 'create', component: SaleTypeCreateUpdateComponent},
  {path: 'update/:id', component: SaleTypeCreateUpdateComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleTypeRoutingModule { }
