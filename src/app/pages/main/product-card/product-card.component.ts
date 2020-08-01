import {Component, Input, OnInit} from '@angular/core';
import {ProductShortPublic} from '../../../interfaces/product';
import {NzModalService} from 'ng-zorro-antd';
import {ProductQuickPreviewComponent} from '../product-quick-preview/product-quick-preview.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product: ProductShortPublic;

  constructor(
    private nzModalService: NzModalService
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

}
