import {Component, OnInit} from '@angular/core';
import {CharacteristicService} from '../../../services/characteristic.service';
import {Characteristic} from '../../../interfaces/characteristic';
import {NzModalRef, NzModalService, NzTreeNode} from 'ng-zorro-antd';
import {CategoryCreateUpdateComponent} from '../category-create-update/category-create-update.component';
import {CharacteristicCreateUpdateComponent} from '../characteristic-create-update/characteristic-create-update.component';
import {NotificationService} from '../../../services/notification.service';

@Component({
  selector: 'app-characteristic-control',
  templateUrl: './characteristic-control.component.html',
  styleUrls: ['./characteristic-control.component.scss']
})
export class CharacteristicControlComponent implements OnInit {

  categoryId: number;
  characteristics: Characteristic[] = [];

  constructor(
    private characteristicService: CharacteristicService,
    private nzModalService: NzModalService,
    private nzModalRef: NzModalRef,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.characteristicService.getByCategoryId(this.categoryId).subscribe(
      response => {
        this.characteristics = response;
      }
    );
  }

  openModal(characteristicId?: number) {
    this.nzModalService.create({
      nzContent: CharacteristicCreateUpdateComponent,
      nzComponentParams: {
        categoryId: this.categoryId,
        characteristicId
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


  delete(node: NzTreeNode) {
    this.characteristicService.deleteById(parseInt(node.key, 10)).subscribe(
      () => {
        this.notificationService.success();
        this.getData();
      }
    );
  }
}
