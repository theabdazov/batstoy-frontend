import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-product-quick-preview',
  templateUrl: './product-quick-preview.component.html',
  styleUrls: ['./product-quick-preview.component.scss']
})
export class ProductQuickPreviewComponent implements OnInit {

  productId: number;

  constructor() {
  }

  ngOnInit(): void {
  }

}
