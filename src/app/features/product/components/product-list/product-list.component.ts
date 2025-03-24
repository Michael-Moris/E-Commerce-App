import { CartService } from './../../../cart/services/cart.service';
import { Product } from '../../models/product';
import { ProductsService } from './../../services/products.service';
import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { ProductCardComponent } from "../product-card/product-card.component";
import { ToastrService } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../../../shared/pipes/search.pipe';

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent, NgxPaginationModule, FormsModule, SearchPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit, OnDestroy {

  @Input() allProducts: Product[] = [];
  @Input() isHomePage: boolean = false;
  @Input() sliceStart: number = 0;
  @Input() sliceEnd: number = 0;
  @Input() homeTitle: string = '';

  pageSize: number = 0;
  currentPage: number = 1;
  total: number = 0;
  searchTerm: string = ''

  private readonly ProductsService = inject(ProductsService);
  private readonly CartService = inject(CartService);
  private readonly toastr = inject(ToastrService);
  private subscription: Subscription | null = null;


  showToastr(msg: string) {
    this.toastr.success(msg, '', {
      progressBar: true,
      timeOut: 1500
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
    this.subscription = this.ProductsService.getProducts(event).subscribe({
      next: (res) => {
        this.allProducts = res.data;
        this.pageSize = res.metadata.limit;
        this.currentPage = res.metadata.currentPage;
        this.total = res.results;
      }
    });
  }
  ngOnInit(): void {
    if (!this.isHomePage) {
      this.subscription = this.ProductsService.getProducts().subscribe({
        next: (res) => {
          this.allProducts = res.data;
          this.pageSize = res.metadata.limit;
          this.currentPage = res.metadata.currentPage;
          this.total = res.results;
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
