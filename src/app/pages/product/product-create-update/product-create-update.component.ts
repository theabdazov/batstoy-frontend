import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Company} from '../../../interfaces/company';
import {Location} from '@angular/common';
import {NotificationService} from '../../../services/notification.service';
import {ActivatedRoute} from '@angular/router';
import {markAllControlsAsTouched} from '../../../util/mark-all-controls-as-touched';
import {ProductService} from '../../../services/product.service';
import {CategoryService} from '../../../services/category.service';
import {NzTreeNodeOptions} from 'ng-zorro-antd';
import {CategoryNode} from '../../../interfaces/category';

@Component({
  selector: 'app-product-create-update',
  templateUrl: './product-create-update.component.html',
  styleUrls: ['./product-create-update.component.scss']
})
export class ProductCreateUpdateComponent implements OnInit {

  formGroup: FormGroup;
  productId: number;
  categoryNodes: NzTreeNodeOptions[] = [];

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private location: Location,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService
  ) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.getCategories();
    this.productId = parseInt(this.activatedRoute.snapshot.params.id, 10);
    if (this.productId) {
      this.getProduct();
    }
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
              disabled: !!(node.children && node.children.length),
            };
          });
        };
        this.categoryNodes = recursion(response);
      }
    );
  }

  getProduct(): void {
    this.productService.getById(this.productId).subscribe(
      response => {
        if (response) {
          this.formGroup.patchValue({...response, categoryId: '3'});
        }
      }
    );
  }


  buildForm() {
    this.formGroup = this.fb.group({
      name: [null, [Validators.required]],
      desc: [null, [Validators.required]],
      ownerPrice: [null, [Validators.required]],
      price: [null, [Validators.required]],
      active: [null],
      photos: [null],
      categoryId: [null],
    });
  }

  onSubmit() {
    markAllControlsAsTouched(this.formGroup);
    if (this.formGroup.valid) {
      this.request().subscribe(
        () => {
          this.notificationService.success();
          this.location.back();
        }
      );
    } else {
      console.log(this.formGroup);
    }
  }

  request() {
    if (this.productId) {
      return this.productService.update(this.productId, this.formGroup.value);
    } else {
      return this.productService.create(this.formGroup.value);
    }
  }


}
