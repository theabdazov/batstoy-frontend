import {Component, OnInit} from '@angular/core';
import {Product, ProductFilter} from '../../../interfaces/product';
import {ProductService} from '../../../services/product.service';
import {NotificationService} from '../../../services/notification.service';

@Component({
  selector: 'app-product-control',
  templateUrl: './product-control.component.html',
  styleUrls: ['./product-control.component.scss']
})
export class ProductControlComponent implements OnInit {

  filter: ProductFilter = {
    id: null,
    categoryIds: [],
    name: null,
    count: 5,
    page: 1
  };
  products: Product[] = [];
  totalCount = 0;

  constructor(
    private productService: ProductService,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.productService.getProductList(this.filter).subscribe(
      response => {
        this.products = response.data;
        this.totalCount = response.totalCount;
      }
    );
  }

  delete(id: number): void {
    this.productService.deleteById(id).subscribe(
      () => {
        this.notificationService.success();
        this.getData();
      }
    );
  }

  pageChange(event: any) {
    this.filter.page = event;
    this.getData();
  }
}
