import {NgModule} from '@angular/core';
import {NZ_ICONS, NzIconModule} from 'ng-zorro-antd/icon';

import {
  SearchOutline,
  WhatsAppOutline,
  TeamOutline,
  ShopOutline,
  MenuOutline,
  ContainerOutline,
  LogoutOutline,
  MinusOutline,
  PlusOutline,
  ShoppingCartOutline,
  CloseOutline,
  FullscreenOutline,
  CopyOutline,
  CloseCircleOutline,
  MenuFoldOutline,
  MinusSquareOutline,
  LockOutline,
  UserOutline
} from '@ant-design/icons-angular/icons';

const icons = [SearchOutline, WhatsAppOutline, TeamOutline, ShopOutline, MenuOutline, ContainerOutline, LogoutOutline, MinusOutline,
  PlusOutline, ShoppingCartOutline, CloseOutline, FullscreenOutline, CopyOutline, CloseCircleOutline, MenuFoldOutline, MinusSquareOutline,
  LockOutline, UserOutline];

@NgModule({
  imports: [NzIconModule],
  exports: [NzIconModule],
  providers: [
    {provide: NZ_ICONS, useValue: icons}
  ]
})
export class IconsProviderModule {
}
