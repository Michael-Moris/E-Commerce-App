import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/cart.interface';
import { DecimalPipe } from '@angular/common';
@Component({
  selector: 'app-cart-item',
  imports: [DecimalPipe],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {
  @Input() product: Product = {} as Product
  @Output() removeProduct = new EventEmitter<string>()
  @Output() updateProductQty = new EventEmitter<{ newCount: number, id: string }>()


  onRemove() {
    this.removeProduct.emit(this.product.product._id)
  }

  onUpdateQty(newCount: number) {
    this.updateProductQty.emit({ id: this.product.product._id, newCount })
  }

}
