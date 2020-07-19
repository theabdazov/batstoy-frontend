import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '../../../services/notification.service';
import {markAllControlsAsTouched} from '../../../util/mark-all-controls-as-touched';
import {CategoryService} from '../../../services/category.service';
import {NzModalRef} from 'ng-zorro-antd';

@Component({
  selector: 'app-category-create-update',
  templateUrl: './category-create-update.component.html',
  styleUrls: ['./category-create-update.component.scss']
})
export class CategoryCreateUpdateComponent implements OnInit {

  formGroup: FormGroup;
  categoryId: number;
  parentCategoryId: number;

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private nzModalRef: NzModalRef
  ) {
  }

  ngOnInit(): void {
    this.buildForm();
    if (this.categoryId) {
      this.getCompany();
    }
  }

  getCompany(): void {
    this.categoryService.getById(this.categoryId).subscribe(
      response => {
        if (response) {
          this.formGroup.patchValue(response);
        }
      }
    );
  }

  buildForm() {
    this.formGroup = this.fb.group({
      name: [null, [Validators.required]],
      imageUrl: [null],
      orderNumber: [null, [Validators.required]],
    });
  }

  onSubmit() {
    markAllControlsAsTouched(this.formGroup);
    if (this.formGroup.valid) {
      this.request().subscribe(
        () => {
          this.notificationService.success();
          this.nzModalRef.close(true);
        }
      );
    } else {
      console.log(this.formGroup);
    }
  }

  request() {
    if (this.categoryId) {
      return this.categoryService.update(this.categoryId, {...this.formGroup.value, parentId: this.parentCategoryId});
    } else {
      return this.categoryService.create({...this.formGroup.value, parentId: this.parentCategoryId});
    }
  }
}
