import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule)},
      {path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule)},
      {path: 'login', loadChildren: () => import('./pages/authentication/authentication.module').then(m => m.AuthenticationModule)},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
