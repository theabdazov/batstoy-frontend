import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './main.component';
import {ProductListComponent} from './product-list/product-list.component';
import {CartComponent} from './cart/cart.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {path: '', component: ProductListComponent},
      {path: 'product/:id', component: ProductDetailComponent},
      {path: 'cart', component: CartComponent},
      {path: 'about', loadChildren: () => import('../about/about.module').then(m => m.AboutModule)},
      {path: 'contacts', loadChildren: () => import('../contacts/contacts.module').then(m => m.ContactsModule)},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
