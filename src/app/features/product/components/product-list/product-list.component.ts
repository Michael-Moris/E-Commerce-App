import { CartService } from './../../../cart/services/cart.service';
import { Product } from '../../models/product';
import { ProductsService } from './../../services/products.service';
import { Component, inject } from '@angular/core';
import { ProductCardComponent } from "../product-card/product-card.component";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  allProducts: Product[] = [];

  private readonly ProductsService = inject(ProductsService);
  private readonly CartService = inject(CartService);
  private readonly toastr = inject(ToastrService)

  showToastr(msg: string) {
    this.toastr.success(msg, '', {
      progressBar: true,
      timeOut: 1500
    });
  }


  getAllProcuts() {
    this.ProductsService.getProducts().subscribe({
      next: ({ data }) => {
        this.allProducts = data;
      }
    })
  }


  addProductToCart(id: string) {
    this.CartService.addProductToCart(id).subscribe({
      next: (res) => {
        this.showToastr('Product Added Successfully')
        this.CartService.cartCounter.set(res.numOfCartItems)
      }
    });
  }

  ngOnInit(): void {
    this.getAllProcuts();
  }
}