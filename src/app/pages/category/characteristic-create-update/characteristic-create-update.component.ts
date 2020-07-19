import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '../../../services/notification.service';
import {markAllControlsAsTouched} from '../../../util/mark-all-controls-as-touched';
import {CharacteristicService} from '../../../services/characteristic.service';
import {NzModalRef} from 'ng-zorro-antd';

@Component({
  selector: 'app-characteristic-create-update',
  templateUrl: './characteristic-create-update.component.html',
  styleUrls: ['./characteristic-create-update.component.scss']
})
export class CharacteristicCreateUpdateComponent implements OnInit {

  formGroup: FormGroup;
  characteristicId: number;
  categoryId: number;

  constructor(
    private characteristicService: CharacteristicService,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private nzModalRef: NzModalRef
  ) {
  }

  getCharacteristic(): void {
    this.characteristicService.getById(this.characteristicId).subscribe(
      response => {
        if (response) {
          let valueList = '';
          if (response.valueList && response.valueList.length) {
            valueList = response.valueList.join(',');
          }
          this.formGroup.patchValue({...response, valueList});
        }
      }
    );
  }

  ngOnInit(): void {
    this.buildForm();
    if (this.characteristicId) {
      this.getCharacteristic();
    }
  }

  buildForm() {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required]],
      orderNumber: [null, [Validators.required]],
      valueList: ['']
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
    let valueList: string[] = [];
    if (this.formGroup.value.valueList) {
      valueList = this.formGroup.value.valueList.split(',');
    }

    if (this.characteristicId) {
      return this.characteristicService.update(this.characteristicId, {...this.formGroup.value, categoryId: this.categoryId, valueList});
    } else {
      return this.characteristicService.create({...this.formGroup.value, categoryId: this.categoryId, valueList});
    }
  }

}
