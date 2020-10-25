import { Component, OnInit } from '@angular/core';
import {Company} from '../../../interfaces/company';
import {CompanyService} from '../../../services/company.service';
import {NotificationService} from '../../../services/notification.service';
import {SaleType} from '../../../interfaces/sale-type';
import {SaleTypeService} from '../../../services/sale-type.service';

@Component({
  selector: 'app-sale-type-control',
  templateUrl: './sale-type-control.component.html',
  styleUrls: ['./sale-type-control.component.scss']
})
export class SaleTypeControlComponent implements OnInit {

  companies: SaleType[] = [];

  constructor(
    private saleTypeService: SaleTypeService,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.saleTypeService.getAll().subscribe(
      response => {
        this.companies = response;
      }
    );
  }

  delete(id: number) {
    this.saleTypeService.deleteById(id).subscribe(
      () => {
        this.getData();
        this.notificationService.success();
      }
    );
  }

}
