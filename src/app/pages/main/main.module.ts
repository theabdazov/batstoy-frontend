import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainRoutingModule} from './main-routing.module';
import {MainComponent} from './main.component';
import {
  NzBackTopModule,
  NzBadgeModule,
  NzIconModule,
  NzInputModule,
  NzModalModule,
  NzPaginationModule,
  NzTreeSelectModule
} from 'ng-zorro-antd';
import {ProductListComponent} from './product-list/product-list.component';
import {CartComponent} from './cart/cart.component';
import {ProductCardComponent} from './product-card/product-card.component';
import {ProductQuickPreviewComponent} from './product-quick-preview/product-quick-preview.component';
import {NavPanelComponent} from './nav-panel/nav-panel.component';
import {CategoryListComponent} from './category-list/category-list.component';
import {PortalModule} from '@angular/cdk/portal';
import {OverlayModule} from '@angular/cdk/overlay';
import {FormsModule} from '@angular/forms';
import {NgxGalleryModule} from '@kolkov/ngx-gallery';


@NgModule({
  declarations: [
    MainComponent,
    ProductListComponent,
    CartComponent,
    ProductCardComponent,
    ProductQuickPreviewComponent,
    NavPanelComponent,
    CategoryListComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    NzIconModule,
    NzInputModule,
    NzBadgeModule,
    NzPaginationModule,
    NzTreeSelectModule,
    NzModalModule,
    PortalModule,
    OverlayModule,
    FormsModule,
    NgxGalleryModule,
    NzBackTopModule
  ]
})
export class MainModule {
}
