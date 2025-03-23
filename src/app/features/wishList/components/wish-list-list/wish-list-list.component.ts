import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { WishListService } from '../../services/wish-list.service';
import { Product } from '../../../product/models/product';
import { WishListItemComponent } from "../wish-list-item/wish-list-item.component";
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wishlist-list',
  imports: [WishListItemComponent, RouterLink],
  templateUrl: './wish-list-list.component.html',
  styleUrl: './wish-list-list.component.css'
})
export class WishListListComponent implements OnInit, OnDestroy {
  private readonly wishList = inject(WishListService);
  private wishlistSub!: Subscription;

  products: Product[] = [];
  wishlist: string[] = [];
  isLoading: boolean = false;

  ngOnInit(): void {
    this.isLoading = true;
    this.wishlistSub = this.wishList.getLoggedUserWishList().subscribe({
      next: (res: any) => {
        this.products = res.data;
        this.wishlist = res.data.map((item: any) => item._id);
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  onProductRemoved(productId: string) {
    this.products = this.products.filter(product => product._id !== productId);
  }

  ngOnDestroy(): void {
    if (this.wishlistSub) {
      this.wishlistSub.unsubscribe();
    }
  }
}
