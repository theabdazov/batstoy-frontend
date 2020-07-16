import {Component, OnInit} from '@angular/core';
import {CompanyService} from '../../../services/company.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {markAllControlsAsTouched} from '../../../util/mark-all-controls-as-touched';
import {Location} from '@angular/common';
import {NotificationService} from '../../../services/notification.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-company-create-update',
  templateUrl: './company-create-update.component.html',
  styleUrls: ['./company-create-update.component.scss']
})
export class CompanyCreateUpdateComponent implements OnInit {


  formGroup: FormGroup;
  companyId: number;

  constructor(
    private companyService: CompanyService,
    private fb: FormBuilder,
    private location: Location,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  getCompany(): void {
    this.companyService.getById(this.companyId).subscribe(
      response => {
        if (response) {
          this.formGroup.patchValue(response);
        }
      }
    );
  }

  ngOnInit(): void {
    this.buildForm();
    this.companyId = parseInt(this.activatedRoute.snapshot.params.id, 10);
    if (this.companyId) {
      this.getCompany();
    }
  }

  buildForm() {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]]
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
    if (this.companyId) {
      return this.companyService.update(this.companyId, this.formGroup.value);
    } else {
      return this.companyService.create(this.formGroup.value);
    }
  }

}
