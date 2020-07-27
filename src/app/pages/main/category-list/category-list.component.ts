import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {CategoryNode} from '../../../interfaces/category';
import {CdkPortal} from '@angular/cdk/portal';
import {Overlay, OverlayPositionBuilder, OverlayRef} from '@angular/cdk/overlay';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, OnChanges {

  @Input() categoryNodes: CategoryNode[] = [];
  nodesMap: { [key: string]: string } = {};
  categoryId: number;

  @ViewChild(CdkPortal) cdkPortal: CdkPortal;
  overlayRef: OverlayRef;
  isOpen = false;

  get label(): string {
    if (this.categoryId) {
      return this.nodesMap[this.categoryId];
    } else {
      return 'По категориям';
    }
  }

  constructor(
    private overlayPositionBuilder: OverlayPositionBuilder,
    private elementRef: ElementRef,
    private overlay: Overlay,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      data => {
        if (data.categoryId) {
          this.categoryId = parseInt(data.categoryId, 10);
        } else {
          this.categoryId = null;
        }
      }
    );
  }

  open(): void {
    this.isOpen = true;
    const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withPositions([{
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top',
      }]).withDefaultOffsetY(-1);
    this.overlayRef = this.overlay.create({positionStrategy, hasBackdrop: true, backdropClass: 'modal-backdoor_transparent'});
    this.overlayRef.backdropClick().subscribe(() => this.overlayClose());
    this.overlayRef.attach(this.cdkPortal);
  }

  overlayClose(): void {
    if (this.overlayRef) {
      this.isOpen = false;
      this.overlayRef.detach();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.categoryNodes) {
      this.nodesMap = {};
      const recursion = (nodes: CategoryNode[]) => {
        if (nodes && nodes.length) {
          nodes.forEach(node => {
            this.nodesMap[node.id] = node.name;
            recursion(node.children);
          });
        }
      };
      recursion(this.categoryNodes);
    }
  }

}
