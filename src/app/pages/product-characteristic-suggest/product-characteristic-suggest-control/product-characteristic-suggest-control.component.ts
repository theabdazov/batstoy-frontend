import {Component, OnInit} from '@angular/core';
import {NotificationService} from '../../../services/notification.service';
import {ProductCharacteristicSuggestService} from '../../../services/product-characteristic-suggest.service';
import {ProductCharacteristicSuggest} from '../../../interfaces/product-characteristic-suggest';
import {NzModalService} from 'ng-zorro-antd';
import {ProductCharacteristicSuggestCreateUpdateComponent} from '../product-characteristic-suggest-create-update/product-characteristic-suggest-create-update.component';

@Component({
  selector: 'app-product-characteristic-suggest-control',
  templateUrl: './product-characteristic-suggest-control.component.html',
  styleUrls: ['./product-characteristic-suggest-control.component.scss']
})
export class ProductCharacteristicSuggestControlComponent implements OnInit {

  productCharacteristics: ProductCharacteristicSuggest[] = [];

  constructor(
    private productCharacteristicSuggestService: ProductCharacteristicSuggestService,
    private notificationService: NotificationService,
    private nzModalService: NzModalService
  ) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.productCharacteristicSuggestService.getAll().subscribe(
      response => {
        this.productCharacteristics = response;
      }
    );
  }

  delete(id: number) {
    this.productCharacteristicSuggestService.deleteById(id).subscribe(
      () => {
        this.getData();
        this.notificationService.success();
      }
    );
  }

  openModal(productCharacteristicSuggest?: ProductCharacteristicSuggest) {
    this.nzModalService.create({
      nzContent: ProductCharacteristicSuggestCreateUpdateComponent,
      nzComponentParams: {
        productCharacteristicSuggest
      },
      nzFooter: null
    }).afterClose.subscribe(
      (result) => {
        if (result) {
          this.getData();
        }
      }
    );
  }

}
