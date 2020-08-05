import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {CategoryNode} from '../../../interfaces/category';
import {CartService} from '../../../services/cart.service';
import {ClearSubscriptions} from '../../../util/clear-subscriptions';
import {ProductShortPublic} from '../../../interfaces/product';
import {ProductService} from '../../../services/product.service';

@Component({
  selector: 'app-nav-panel',
  templateUrl: './nav-panel.component.html',
  styleUrls: ['./nav-panel.component.scss']
})
export class NavPanelComponent extends ClearSubscriptions implements OnInit {

  @Input() categoryNodes: CategoryNode[] = [];

  cartProductCount: number;
  cartMap: { [key: number]: number } = {};
  totalPrice = 0;
  products: ProductShortPublic[] = [];
  visible = false;

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {
    super();
  }

  ngOnInit(): void {
    this.addSubscription(
      this.cartService.cartMap.subscribe(
        data => {
          this.products = [];
          this.cartMap = data;
          this.cartProductCount = Object.keys(data).length;
          if (this.cartProductCount) {
            this.load();
          }
        }
      )
    );
  }

  load(): void {
    const ids = Object.keys(this.cartService.cartMap.getValue()).map(id => parseInt(id, 10));
    this.productService.getByIdsPublic(ids).subscribe(
      response => {
        this.products = response;
        this.calculateTotalPrice();
      }
    );
  }

  delete(productId: number): void {
    this.cartService.deleteFromCart(productId);
  }

  calculateTotalPrice(): void {
    this.totalPrice = 0;
    this.products.forEach(product => {
      this.totalPrice += product.price * this.cartMap[product.id];
    });
  }

  close() {
    this.visible = false;
  }

}
