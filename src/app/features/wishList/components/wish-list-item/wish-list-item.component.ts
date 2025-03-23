import { WishListService } from '../../services/wish-list.service';
import { CartService } from './../../../cart/services/cart.service';
import { Component, Input, Output, inject } from '@angular/core';
import { Product } from '../../../product/models/product';
import { EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';


@Component({
  selector: 'app-wishlist-item',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './wish-list-item.component.html',
  styleUrl: './wish-list-item.component.css'
})
export class WishListItemComponent {

  wishlist: string[] = []

  private readonly cartService = inject(CartService)
  private readonly wishList = inject(WishListService)
  private readonly toastr = inject(ToastrService)

  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<string>();
  @Output() productRemoved = new EventEmitter<string>();


  showToastr(msg: string) {
    this.toastr.success(msg, '', {
      progressBar: true,
      timeOut: 1500
    });
  }

  onAddToCart() {
    this.cartService.addProductToCart(this.product._id).subscribe({
      next: (res) => {
        this.addToCart.emit(this.product._id);
        this.showToastr('Product Added Successfully')
        this.cartService.cartCounter.set(res.numOfCartItems)
      }
    });
  }

  onRemoveFromWishList(id: string) {
    this.wishList.removeFromWishList(id).subscribe({
      next: (res: any) => {
        this.showToastr('Product Removed Successfully')
        this.productRemoved.emit(this.product._id)
        this.wishList.wishListCounter.set(res.data.length)
        this.wishlist = res.data
      }
    });
  }


  displayWishListData() {
    this.wishList.getLoggedUserWishList();
  }

  ngOnInit(): void {
    this.displayWishListData()
  }
}
