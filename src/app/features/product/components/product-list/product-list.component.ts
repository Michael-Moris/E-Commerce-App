import { CartService } from './../../../cart/services/cart.service';
import { Product } from '../../models/product';
import { ProductsService } from './../../services/products.service';
import { Component, inject } from '@angular/core';
import { ProductCardComponent } from "../product-card/product-card.component";
import { ToastrService } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent, NgxPaginationModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  allProducts: Product[] = [];
  pageSize: number = 0;
  currentPage: number = 1;
  total: number = 0;

  private readonly ProductsService = inject(ProductsService);
  private readonly CartService = inject(CartService);
  private readonly toastr = inject(ToastrService);

  showToastr(msg: string) {
    this.toastr.success(msg, '', {
      progressBar: true,
      timeOut: 1500
    });
  }

  getAllProducts() {
    this.ProductsService.getProducts().subscribe({
      next: (res) => {
        this.allProducts = res.data;
        this.pageSize = res.metadata.limit;
        this.currentPage = res.metadata.currentPage;
        this.total = res.results;
      }
    });
  }

  addProductToCart(id: string) {
    this.CartService.addProductToCart(id).subscribe({
      next: (res) => {
        this.showToastr('Product Added Successfully');
        this.CartService.cartCounter.set(res.numOfCartItems);
      }
    });
  }

  pageChanged(event: number): void {
    this.ProductsService.getProducts(event).subscribe({
      next: (res) => {
        this.allProducts = res.data;
        this.pageSize = res.metadata.limit;
        this.currentPage = res.metadata.currentPage;
        this.total = res.results;
      }
    });
  }

  ngOnInit(): void {
    this.getAllProducts();
  }
}
