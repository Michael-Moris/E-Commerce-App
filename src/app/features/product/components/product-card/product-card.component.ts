import { RouterLink } from '@angular/router';
import { Product } from './../../models/product';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { WishListService } from '../../../wishList/services/wish-list.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  wishlist: string[] = []

  private readonly wishList = inject(WishListService);
  @Output() productRemoved = new EventEmitter<string>();

  private readonly toastr = inject(ToastrService);

  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<string>();

  onAddToCart() {
    this.addToCart.emit(this.product._id);
  }

  showToastr(msg: string) {
    this.toastr.success(msg, '', {
      progressBar: true,
      timeOut: 1500
    });
  }

  onToggleWishlist(id: string) {
    this.wishList.addToWishList(id).subscribe({
      next: (res: any) => {
        this.showToastr('Product Added Successfully');
        this.wishList.wishListCounter.set(res.data.length);
        this.wishlist = res.data;
      }
    });
  }

  onRemoveFromWishList(id: string) {
    this.wishList.removeFromWishList(id).subscribe({
      next: (res: any) => {
        this.showToastr('Product Removed Successfully');
        this.productRemoved.emit(this.product._id);
        this.wishList.wishListCounter.set(res.data.length);
        this.wishlist = res.data;
      }
    });
  }

  ngOnInit(): void {
    this.wishList.getLoggedUserWishList().subscribe({
      next: (res) => {
        const newWishData = res.data.map((item: any) => item._id);
        this.wishlist = newWishData;
      }
    });
  }

  // isProductInWishlist(): boolean {
  //   return this.wishlist.includes(this.product._id);
  // }
}
