import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../../../services/notification.service';
import {SaleType} from '../../../interfaces/sale-type';
import {SaleTypeService} from '../../../services/sale-type.service';

@Component({
  selector: 'app-sale-type-control',
  templateUrl: './sale-type-control.component.html',
  styleUrls: ['./sale-type-control.component.scss']
})
export class SaleTypeControlComponent implements OnInit {

  saleTypes: SaleType[] = [];

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
        this.saleTypes = response;
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
