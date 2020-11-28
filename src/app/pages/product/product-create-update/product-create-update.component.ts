import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {NotificationService} from '../../../services/notification.service';
import {ActivatedRoute} from '@angular/router';
import {markAllControlsAsTouched} from '../../../util/mark-all-controls-as-touched';
import {ProductService} from '../../../services/product.service';
import {CategoryService} from '../../../services/category.service';
import {NzTreeNodeOptions} from 'ng-zorro-antd';
import {CategoryNode} from '../../../interfaces/category';
import {Company} from '../../../interfaces/company';
import {CompanyService} from '../../../services/company.service';
import {SaleType} from '../../../interfaces/sale-type';
import {SaleTypeService} from '../../../services/sale-type.service';
import {ProductCharacteristicSuggest} from '../../../interfaces/product-characteristic-suggest';
import {ProductCharacteristicSuggestService} from '../../../services/product-characteristic-suggest.service';

@Component({
  selector: 'app-product-create-update',
  templateUrl: './product-create-update.component.html',
  styleUrls: ['./product-create-update.component.scss']
})
export class ProductCreateUpdateComponent implements OnInit {

  formGroup: FormGroup;
  productId: number;
  categoryNodes: NzTreeNodeOptions[] = [];
  companies: Company[] = [];
  saleTypes: SaleType[] = [];
  editorConfig = {
    sanitize: false,
    editable: true,
    placeholder: 'Введите текст',
    toolbarHiddenButtons: [
      [],
      ['insertImage'],
      ['insertVideo'],
    ]
  };
  productCharacteristicSuggests: string[] = [];

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private location: Location,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private companyService: CompanyService,
    private saleTypeService: SaleTypeService,
    private productCharacteristicSuggestService: ProductCharacteristicSuggestService
  ) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.getCategories();
    this.getCompanies();
    this.getSaleTypes();
    this.productId = parseInt(this.activatedRoute.snapshot.params.id, 10);
    if (this.productId) {
      this.getProduct();
    }
    this.productCharacteristicSuggestService.getAll().subscribe(
      response => {
        this.productCharacteristicSuggests = response.map(item => item.title);
      }
    );
  }

  getSaleTypes(): void {
    this.saleTypeService.getAll().subscribe(
      response => {
        this.saleTypes = response;
      }
    );
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
          this.formGroup.patchValue({
            ...response,
            categoryId: response.category.id.toString(),
            companyId: response.company ? response.company.id : null,
            saleTypeId: response.saleType ? response.saleType.id : null,
          });
          if (response.characteristics && response.characteristics.length) {
            response.characteristics.forEach((item) => {
              this.addCharacteristic();
              this.characteristics.at(this.characteristics.length - 1).patchValue(item);
            });
          }
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
      active: [null, [Validators.required]],
      photos: [null, [Validators.required]],
      categoryId: [null, [Validators.required]],
      saleTypeId: [null, [Validators.required]],
      companyId: [null],
      characteristics: this.fb.array([])
    });
  }

  get characteristics(): FormArray {
    return this.formGroup.controls.characteristics as FormArray;
  }

  addCharacteristic(): void {
    this.characteristics.push(this.fb.group({
      title: [null, [Validators.required]],
      value: [null, [Validators.required]],
    }));
  }

  removeCharacteristic(index: number): void {
    this.characteristics.removeAt(index);
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
      return this.productService.update(this.productId, this.formGroup.getRawValue());
    } else {
      return this.productService.create(this.formGroup.getRawValue());
    }
  }


}
