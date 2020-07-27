import {Component, Input, OnInit} from '@angular/core';
import {ProductShortPublic} from '../../../interfaces/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product: ProductShortPublic;

  constructor() {
  }

  ngOnInit(): void {
  }

}
