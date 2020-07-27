import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../services/product.service';
import {ProductFilterPublic, ProductShortPublic} from '../../../interfaces/product';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  filter: ProductFilterPublic = {
    page: 1,
    categoryId: null,
    count: 100,
    name: null
  };
  products: ProductShortPublic[] = [];
  totalCount = 0;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      data => {
        if (data.categoryId) {
          this.filter.categoryId = parseInt(data.categoryId, 10);
        } else {
          this.filter.categoryId = null;
        }
        if (data.searchText) {
          this.filter.name = data.searchText;
        } else {
          this.filter.name = null;
        }
        this.getData();
      }
    );
  }

  getData(): void {
    this.productService.getProductListPublic(this.filter).subscribe(
      response => {
        this.products = response.data;
        this.totalCount = response.totalCount;
      }
    );
  }

  pageChange(page: number) {
    this.filter.page = page;
    this.getData();
  }
}
