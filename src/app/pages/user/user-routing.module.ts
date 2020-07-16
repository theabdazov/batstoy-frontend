import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserControlComponent} from './user-control/user-control.component';
import {UserCreateUpdateComponent} from './user-create-update/user-create-update.component';


const routes: Routes = [
  {
    path: 'control',
    component: UserControlComponent,
  },
  {
    path: 'update/:id',
    component: UserCreateUpdateComponent
  },
  {
    path: 'create',
    component: UserCreateUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
