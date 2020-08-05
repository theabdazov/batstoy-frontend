import {Component, Input, OnInit} from '@angular/core';
import {ProductShortPublic} from '../../../interfaces/product';
import {NzModalService} from 'ng-zorro-antd';
import {ProductQuickPreviewComponent} from '../product-quick-preview/product-quick-preview.component';
import {CartService} from '../../../services/cart.service';
import {NotificationService} from '../../../services/notification.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product: ProductShortPublic;

  constructor(
    private nzModalService: NzModalService,
    private cartService: CartService,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
  }

  openModal(event: MouseEvent): void {
    event.stopPropagation();
    this.nzModalService.create({
      nzContent: ProductQuickPreviewComponent,
      nzComponentParams: {
        product: this.product
      },
      nzStyle: {
        display: 'table'
      },
      nzFooter: null
    });
  }

  onClickAddToCart(event: MouseEvent) {
    event.stopPropagation();
    this.cartService.addToCart(this.product.id, 1);
    this.notificationService.success('Товар добавлен в корзину');
  }
}
