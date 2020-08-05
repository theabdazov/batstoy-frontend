import {Component, OnInit} from '@angular/core';
import {ProductShortPublic} from '../../../interfaces/product';
import {CartService} from '../../../services/cart.service';
import {ProductService} from '../../../services/product.service';
import {ClearSubscriptions} from '../../../util/clear-subscriptions';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {markAllControlsAsTouched} from '../../../util/mark-all-controls-as-touched';
import {OrderService} from '../../../services/order.service';
import {OrderAdding} from '../../../interfaces/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent extends ClearSubscriptions implements OnInit {

  cartMap: { [key: number]: number } = {};
  totalPrice = 0;
  products: ProductShortPublic[] = [];
  formGroup: FormGroup;
  isSuccess = false;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private fb: FormBuilder,
    private orderService: OrderService
  ) {
    super();
  }

  ngOnInit(): void {
    this.buildForm();
    this.addSubscription(
      this.cartService.cartMap.subscribe(
        data => {
          this.cartMap = data;
          const count = Object.keys(data).length;
          if (count) {
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

  buildForm() {
    this.formGroup = this.fb.group({
      customerFullName: [null, [Validators.required]],
      customerPhoneNumber: [null, [Validators.required]],
      address: [null, [Validators.required]],
      comment: [null]
    });
  }

  onSubmit() {
    markAllControlsAsTouched(this.formGroup);
    if (this.formGroup.valid) {
      const order: OrderAdding = this.formGroup.value;
      order.products = this.products.map(product => {
        return {
          productId: product.id,
          count: this.cartMap[product.id]
        };
      });
      this.orderService.create(order).subscribe(
        () => {
          this.isSuccess = true;
          this.cartService.clearCart();
        }
      );
    } else {
      console.log(this.formGroup);
    }
  }

}
