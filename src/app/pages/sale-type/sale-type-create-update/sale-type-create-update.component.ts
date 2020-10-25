import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CompanyService} from '../../../services/company.service';
import {Location} from '@angular/common';
import {NotificationService} from '../../../services/notification.service';
import {ActivatedRoute} from '@angular/router';
import {markAllControlsAsTouched} from '../../../util/mark-all-controls-as-touched';
import {SaleTypeService} from '../../../services/sale-type.service';

@Component({
  selector: 'app-sale-type-create-update',
  templateUrl: './sale-type-create-update.component.html',
  styleUrls: ['./sale-type-create-update.component.scss']
})
export class SaleTypeCreateUpdateComponent implements OnInit {


  formGroup: FormGroup;
  saleTypeId: number;

  constructor(
    private saleTypeService: SaleTypeService,
    private fb: FormBuilder,
    private location: Location,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  getCompany(): void {
    this.saleTypeService.getById(this.saleTypeId).subscribe(
      response => {
        if (response) {
          this.formGroup.patchValue(response);
        }
      }
    );
  }

  ngOnInit(): void {
    this.buildForm();
    this.saleTypeId = parseInt(this.activatedRoute.snapshot.params.id, 10);
    if (this.saleTypeId) {
      this.getCompany();
    }
  }

  buildForm() {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required]],
      shortName: ['', [Validators.required]]
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
    if (this.saleTypeId) {
      return this.saleTypeService.update(this.saleTypeId, this.formGroup.value);
    } else {
      return this.saleTypeService.create(this.formGroup.value);
    }
  }

}
