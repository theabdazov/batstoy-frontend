import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin.component';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {path: 'user', loadChildren: () => import('../user/user.module').then(m => m.UserModule)},
      {path: 'company', loadChildren: () => import('../company/company.module').then(m => m.CompanyModule)},
      {path: 'category', loadChildren: () => import('../category/category.module').then(m => m.CategoryModule)}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
