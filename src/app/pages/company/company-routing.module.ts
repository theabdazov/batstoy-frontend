import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CompanyControlComponent} from './company-control/company-control.component';
import {CompanyCreateUpdateComponent} from './company-create-update/company-create-update.component';


const routes: Routes = [
  {path: 'control', component: CompanyControlComponent},
  {path: 'create', component: CompanyCreateUpdateComponent},
  {path: 'update/:id', component: CompanyCreateUpdateComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
