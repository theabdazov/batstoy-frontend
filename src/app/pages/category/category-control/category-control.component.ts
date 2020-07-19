import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../../services/category.service';
import {CategoryNode} from '../../../interfaces/category';
import {
  NzContextMenuService,
  NzDropdownMenuComponent,
  NzFormatEmitEvent,
  NzModalService,
  NzTreeNode,
  NzTreeNodeOptions
} from 'ng-zorro-antd';
import {CategoryCreateUpdateComponent} from '../category-create-update/category-create-update.component';
import {NotificationService} from '../../../services/notification.service';
import {CharacteristicControlComponent} from '../characteristic-control/characteristic-control.component';

@Component({
  selector: 'app-category-control',
  templateUrl: './category-control.component.html',
  styleUrls: ['./category-control.component.scss']
})
export class CategoryControlComponent implements OnInit {

  tree: CategoryNode[] = [];
  nodes: NzTreeNodeOptions[] = [];

  constructor(
    private categoryService: CategoryService,
    private nzModalService: NzModalService,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.categoryService.getAllTree().subscribe(
      response => {
        const recursion = (list: CategoryNode[]): NzTreeNodeOptions[] => {
          if (!list || !list.length) {
            return [];
          }
          return list.map(node => {
            return {
              title: node.name,
              key: node.id.toString(),
              children: recursion(node.children),
              isLeaf: !(node.children && node.children.length),
              expanded: !!(node.children && node.children.length)
            };
          });
        };
        this.nodes = recursion(response);
        this.tree = response;
      }
    );
  }

  openModal(parentCategoryId?: number, categoryId?: number) {
    this.nzModalService.create({
      nzContent: CategoryCreateUpdateComponent,
      nzComponentParams: {
        parentCategoryId,
        categoryId
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

  update(node: NzTreeNode) {
    let parentId = null;
    if (node.parentNode) {
      parentId = parseInt(node.parentNode.key, 10);
    }
    this.openModal(parentId, parseInt(node.key, 10));
  }


  delete(node: NzTreeNode) {
    this.categoryService.deleteById(parseInt(node.key, 10)).subscribe(
      () => {
        this.notificationService.success();
        this.getData();
      },
      error => {
        this.notificationService.error('Сначала удалите все дочерные категории');
      }
    );
  }

  openCharacteristic(categoryId: string) {
    this.nzModalService.create({
      nzContent: CharacteristicControlComponent,
      nzWidth: '800px',
      nzComponentParams: {
        categoryId: parseInt(categoryId, 10)
      },
      nzFooter: null
    }).afterClose.subscribe(
      (result) => {
      }
    );
  }

}
