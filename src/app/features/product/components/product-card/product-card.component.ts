import { Component, EventEmitter, Input, Output, OnInit, OnDestroy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WishListService } from '../../../wishList/services/wish-list.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from './../../models/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit, OnDestroy {
  wishlist: string[] = [];

  private readonly wishList = inject(WishListService);
  private readonly toastr = inject(ToastrService);

  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<string>();
  @Output() productRemoved = new EventEmitter<string>();

  private subscriptions: Subscription = new Subscription();

  ngOnInit(): void {
    const sub = this.wishList.getLoggedUserWishList().subscribe({
      next: (res) => {
        const newWishData = res.data.map((item: any) => item._id);
        this.wishlist = newWishData;
      }
    });
    this.subscriptions.add(sub);
  }

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
    const sub = this.wishList.addToWishList(id).subscribe({
      next: (res: any) => {
        this.showToastr('Product Added Successfully');
        this.wishList.wishListCounter.set(res.data.length);
        this.wishlist = res.data;
      }
    });
    this.subscriptions.add(sub);
  }

  onRemoveFromWishList(id: string) {
    const sub = this.wishList.removeFromWishList(id).subscribe({
      next: (res: any) => {
        this.showToastr('Product Removed Successfully');
        this.productRemoved.emit(this.product._id);
        this.wishList.wishListCounter.set(res.data.length);
        this.wishlist = res.data;
      }
    });
    this.subscriptions.add(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  // isProductInWishlist(): boolean {
  //   return this.wishlist.includes(this.product._id);
  // }
}
