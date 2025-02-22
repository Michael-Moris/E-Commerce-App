import { log } from 'console';
import { CartService } from './../../services/cart.service';
import { Component, inject } from '@angular/core';
import { Cart } from '../../models/cart.interface';
import { CartItemComponent } from "../cart-item/cart-item.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-list',
  imports: [CartItemComponent, RouterLink],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.css'
})
export class CartListComponent {

  private readonly CartService = inject(CartService)

  cartDetails: Cart = {} as Cart
  isLoading: boolean = false

  ngOnInit(): void {
    this.loadCart()
  }

  loadCart() {
    this.CartService.getloggedUserCart().subscribe({
      next: (res) => {
        this.cartDetails = res
        this.isLoading = true
      }
    })
  }

  removeProduct(id: string) {
    this.CartService.removeCartItem(id).subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails = res
      }
    })
  }

  updateQty(id: string, count: number) {
    this.CartService.updateCartQuantity(id, count).subscribe({
      next: (res) => {
        this.cartDetails = res
      }
    })
  }

  clearCart() {
    this.CartService.clearCart().subscribe({
      next: (res) => {
        console.log(res);
        if (res.message == 'success') {
          this.loadCart()
        }
      }
    })
  }
}
