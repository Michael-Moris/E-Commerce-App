import { Component, inject, OnInit } from '@angular/core';
import { WishListService } from '../../services/wish-list.service';
import { Product } from '../../../product/models/product';
import { WishListItemComponent } from "../wish-list-item/wish-list-item.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlist-list',
  imports: [WishListItemComponent, RouterLink],
  templateUrl: './wish-list-list.component.html',
  styleUrl: './wish-list-list.component.css'
})
export class WishListListComponent implements OnInit {
  private readonly wishlist = inject(WishListService)

  products: Product[] = []
  isLoading: boolean = false

  ngOnInit(): void {
    this.isLoading = true;
    this.wishlist.getLoggedUserWishList().subscribe({
      next: (res: any) => {
        this.products = res.data
        this.isLoading = false;
      }
    })
  }

  onProductRemoved(productId: string) {
    this.products = this.products.filter(product => product._id !== productId);
  }

}
