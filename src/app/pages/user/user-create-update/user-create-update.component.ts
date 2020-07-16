import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {User} from '../../../interfaces/user';
import {Company} from '../../../interfaces/company';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CompanyService} from '../../../services/company.service';
import {Location} from '@angular/common';
import {NotificationService} from '../../../services/notification.service';
import {markAllControlsAsTouched} from '../../../util/mark-all-controls-as-touched';

@Component({
  selector: 'app-user-create-update',
  templateUrl: './user-create-update.component.html',
  styleUrls: ['./user-create-update.component.scss']
})
export class UserCreateUpdateComponent implements OnInit {

  formGroup: FormGroup;
  userId: number;
  companies: Company[] = [];

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private location: Location,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService
  ) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.getCompanies();
    this.userId = parseInt(this.activatedRoute.snapshot.params.id, 10);
    if (this.userId) {
      this.getUser();
    }
  }

  getCompanies(): void {
    this.companyService.getAll().subscribe(
      response => {
        this.companies = response;
      }
    );
  }

  getUser(): void {
    this.userService.getById(this.userId).subscribe(
      response => {
        if (response) {
          this.formGroup.patchValue({...response, companyId: response.company?.id});
        }
      }
    );
  }


  buildForm() {
    this.formGroup = this.fb.group({
      fullName: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      companyId: [null]
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
    if (this.userId) {
      return this.userService.update(this.userId, this.formGroup.value);
    } else {
      return this.userService.create(this.formGroup.value);
    }
  }

}
