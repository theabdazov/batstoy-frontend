import {Component, OnInit} from '@angular/core';
import {Product, ProductFilter} from '../../../interfaces/product';
import {ProductService} from '../../../services/product.service';
import {NotificationService} from '../../../services/notification.service';
import {NzTreeNodeOptions} from 'ng-zorro-antd';
import {Company} from '../../../interfaces/company';
import {CategoryNode} from '../../../interfaces/category';
import {CategoryService} from '../../../services/category.service';
import {CompanyService} from '../../../services/company.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-product-control',
  templateUrl: './product-control.component.html',
  styleUrls: ['./product-control.component.scss']
})
export class ProductControlComponent implements OnInit {

  categoryNodes: NzTreeNodeOptions[] = [];
  companies: Company[] = [];
  filter: ProductFilter = {
    id: null,
    categoryIds: [],
    companyIds: [],
    name: null,
    count: 10,
    page: 1
  };
  products: Product[] = [];
  totalCount = 0;

  constructor(
    private productService: ProductService,
    private notificationService: NotificationService,
    private categoryService: CategoryService,
    private companyService: CompanyService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.getFilterFromUrl();
    this.getData();
    this.getCategories();
    this.getCompanies();
  }

  getData(): void {
    this.saveFilterToUrl();
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

  pageChange(event: number) {
    this.filter.page = event;
    this.getData();
  }

  getCompanies(): void {
    this.companyService.getAll().subscribe(
      response => {
        this.companies = response;
      }
    );
  }

  getCategories(): void {
    this.categoryService.getAllTree().subscribe(
      response => {
        const recursion = (list: CategoryNode[]): NzTreeNodeOptions[] => {
          if (!list || !list.length) {
            return [];
          }
          return list.map(node => {
            return {
              title: node.name,
              key: node.id.toString(),
              children: recursion(node.children),
              isLeaf: !(node.children && node.children.length),
              expanded: !!(node.children && node.children.length),
              icon: null,
            };
          });
        };
        this.categoryNodes = recursion(response);
      }
    );
  }

  clear() {
    this.filter = {
      id: null,
      categoryIds: [],
      companyIds: [],
      name: null,
      count: 10,
      page: 1
    };
    this.getData();
  }

  saveFilterToUrl(): void {
    this.router.navigate([], {
      relativeTo: this.activatedRouter,
      queryParams: {
        filter: JSON.stringify(this.filter)
      },
      queryParamsHandling: 'merge'
    });
  }

  getFilterFromUrl(): void {
    const filterString = this.activatedRouter.snapshot.queryParams.filter;
    if (filterString) {
      try {
        this.filter = JSON.parse(filterString);
      } catch (e) {
        console.log(e);
      }
    }
  }

}
