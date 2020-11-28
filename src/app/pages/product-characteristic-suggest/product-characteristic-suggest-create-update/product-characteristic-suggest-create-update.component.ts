import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '../../../services/notification.service';
import {NzModalRef} from 'ng-zorro-antd';
import {markAllControlsAsTouched} from '../../../util/mark-all-controls-as-touched';
import {ProductCharacteristicSuggest} from '../../../interfaces/product-characteristic-suggest';
import {ProductCharacteristicSuggestService} from '../../../services/product-characteristic-suggest.service';

@Component({
  selector: 'app-product-characteristic-suggest-create-update',
  templateUrl: './product-characteristic-suggest-create-update.component.html',
  styleUrls: ['./product-characteristic-suggest-create-update.component.scss']
})
export class ProductCharacteristicSuggestCreateUpdateComponent implements OnInit {

  formGroup: FormGroup;
  productCharacteristicSuggest: ProductCharacteristicSuggest

  constructor(
    private productCharacteristicSuggestService: ProductCharacteristicSuggestService,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private nzModalRef: NzModalRef
  ) {
  }

  ngOnInit(): void {
    this.buildForm();

    if (this.productCharacteristicSuggest) {
      this.formGroup.patchValue(this.productCharacteristicSuggest)
    }
  }

  buildForm() {
    this.formGroup = this.fb.group({
      title: [null, [Validators.required]],
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
    if (this.productCharacteristicSuggest) {
      return this.productCharacteristicSuggestService.update(this.productCharacteristicSuggest.id, this.formGroup.value);
    } else {
      return this.productCharacteristicSuggestService.create(this.formGroup.value);
    }
  }

}
