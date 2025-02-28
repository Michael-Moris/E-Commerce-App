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
  private readonly wishList = inject(WishListService)

  products: Product[] = []
  wishlist: string[] = []
  isLoading: boolean = false

  ngOnInit(): void {
    this.isLoading = true;
    this.wishList.getLoggedUserWishList().subscribe({
      next: (res: any) => {
        this.products = res.data
        this.isLoading = false;
        const newWishData = res.data.map((item: any) => item._id)
        this.wishlist = newWishData
      }
    })
  }

  onProductRemoved(productId: string) {
    this.products = this.products.filter(product => product._id !== productId);
  }

}
