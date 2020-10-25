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
      {path: 'category', loadChildren: () => import('../category/category.module').then(m => m.CategoryModule)},
      {path: 'file', loadChildren: () => import('../file/file.module').then(m => m.FileModule)},
      {path: 'product', loadChildren: () => import('../product/product.module').then(m => m.ProductModule)},
      {path: 'sale-type', loadChildren: () => import('../sale-type/sale-type.module').then(m => m.SaleTypeModule)},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
