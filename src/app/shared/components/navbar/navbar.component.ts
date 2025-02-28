import { WishListService } from './../../../features/wishList/services/wish-list.service';
import { isPlatformBrowser } from '@angular/common';
import { CartService } from './../../../features/cart/services/cart.service';
import { Component, computed, inject, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';
import { PLATFORM_ID } from '@angular/core';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  navBarCounter = computed(() => this.cartService.cartCounter())
  navBarCounter2 = computed(() => this.wishListService.wishListCounter())
  // navBarCounter2: number = 0

  private readonly wishListService = inject(WishListService)
  private readonly cartService = inject(CartService)
  private readonly auth = inject(AuthService)
  private readonly platformId = inject(PLATFORM_ID);
  @Input() layout!: string;


  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.cartService.getloggedUserCart().subscribe({
        next: (res) => {
          this.cartService.cartCounter.set(res.numOfCartItems)
          // this.wishListService.wishListCounter.subscribe({
          //   next: (value) => {
          //     this.navBarCounter2 = value
          //   },
          // })
        }
      })

      this.wishListService.getLoggedUserWishList().subscribe({
        next: (res) => {
          this.wishListService.wishListCounter.set(res.data.length)
        }
      })
    }
  }

  logOut() {
    this.auth.logOut()
  }
}
