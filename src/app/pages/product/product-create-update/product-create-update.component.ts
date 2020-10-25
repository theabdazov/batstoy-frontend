import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {NotificationService} from '../../../services/notification.service';
import {ActivatedRoute} from '@angular/router';
import {markAllControlsAsTouched} from '../../../util/mark-all-controls-as-touched';
import {ProductService} from '../../../services/product.service';
import {CategoryService} from '../../../services/category.service';
import {NzTreeNodeOptions} from 'ng-zorro-antd';
import {CategoryNode} from '../../../interfaces/category';
import {Characteristic} from '../../../interfaces/characteristic';
import {CharacteristicService} from '../../../services/characteristic.service';
import {ProductAdding} from '../../../interfaces/product';
import {CharacteristicValueAdding} from '../../../interfaces/characteristic-value';
import {Company} from '../../../interfaces/company';
import {CompanyService} from '../../../services/company.service';

@Component({
  selector: 'app-product-create-update',
  templateUrl: './product-create-update.component.html',
  styleUrls: ['./product-create-update.component.scss']
})
export class ProductCreateUpdateComponent implements OnInit {

  formGroup: FormGroup;
  productId: number;
  categoryNodes: NzTreeNodeOptions[] = [];
  characteristics: Characteristic[] = [];
  companies: Company[] = [];
  characteristicValueMap: { [key: string]: string } = {};
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

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private location: Location,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private characteristicService: CharacteristicService,
    private companyService: CompanyService
  ) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.getCategories();
    this.getCompanies();
    this.productId = parseInt(this.activatedRoute.snapshot.params.id, 10);
    if (this.productId) {
      this.getProduct();
    }
  }

  getCompanies(): void {
    this.companyService.getAll().subscribe(
      response => {
        this.companies = response;
      }
    );
  }

  getCharacteristic(categoryId: number): void {
    this.characteristicService.getByCategoryId(categoryId).subscribe(
      response => {
        this.characteristics = response;
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
          this.characteristicValueMap = {};
          this.formGroup.patchValue({
            ...response,
            categoryId: response.category.id.toString(),
            companyId: response.company ? response.company.id : null
          });
          this.getCharacteristic(response.category.id);
          if (response.characteristicValues && response.characteristicValues.length) {
            response.characteristicValues.forEach(item => {
              this.characteristicValueMap[item.characteristic.id] = item.value;
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
      companyId: [null],
    });

    this.formGroup.controls.categoryId.valueChanges.subscribe(
      value => {
        if (value) {
          this.characteristicValueMap = {};
          this.characteristics = [];
          this.getCharacteristic(value);
        }
      }
    );
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
    const characteristicValueAdding: CharacteristicValueAdding[] = Object.keys(this.characteristicValueMap)
      .filter(key => this.characteristicValueMap[key])
      .map(key => {
        return {
          characteristicId: parseInt(key, 10),
          value: this.characteristicValueMap[key]
        };
      });
    const productAdding: ProductAdding = {
      ...this.formGroup.value,
      characteristicValues: characteristicValueAdding
    };

    if (this.productId) {
      return this.productService.update(this.productId, productAdding);
    } else {
      return this.productService.create(productAdding);
    }
  }


}
