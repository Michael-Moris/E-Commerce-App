import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CartService } from './../../services/cart.service';
import { Cart } from '../../models/cart.interface';
import { CartItemComponent } from "../cart-item/cart-item.component";
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-cart-list',
  imports: [CartItemComponent, RouterLink, DecimalPipe],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.css'
})
export class CartListComponent implements OnInit, OnDestroy {
  private readonly cartService = inject(CartService);
  private subscriptions: Subscription = new Subscription();

  cartDetails: Cart = {} as Cart;
  isLoading: boolean = false;

  loadCart() {
    const sub = this.cartService.getloggedUserCart().subscribe({
      next: (res) => {
        this.cartDetails = res;
        this.isLoading = true;
        if (this.cartDetails.numOfCartItems === 0) {
          this.cartService.cartCounter.set(0);
        }
      }
    });
    this.subscriptions.add(sub);
  }

  removeProduct(id: string) {
    const sub = this.cartService.removeCartItem(id).subscribe({
      next: (res) => {
        this.cartDetails = res;
        this.cartService.cartCounter.set(res.numOfCartItems);
      }
    });
    this.subscriptions.add(sub);
  }

  updateQty(id: string, count: number) {
    const sub = this.cartService.updateCartQuantity(id, count).subscribe({
      next: (res) => {
        this.cartDetails = res;
        this.cartService.cartCounter.set(res.numOfCartItems);
      }
    });
    this.subscriptions.add(sub);
  }

  clearCart() {
    const sub = this.cartService.clearCart().subscribe({
      next: (res) => {
        if (res.message === 'success') {
          this.loadCart();
        }
      }
    });
    this.subscriptions.add(sub);
  }

  ngOnInit(): void {
    this.loadCart();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
