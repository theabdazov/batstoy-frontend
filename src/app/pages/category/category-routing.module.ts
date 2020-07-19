import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CategoryControlComponent} from './category-control/category-control.component';
import {CategoryCreateUpdateComponent} from './category-create-update/category-create-update.component';


const routes: Routes = [
  {path: 'control', component: CategoryControlComponent},
  {path: 'create', component: CategoryCreateUpdateComponent},
  {path: 'update/:id', component: CategoryCreateUpdateComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule {
}
