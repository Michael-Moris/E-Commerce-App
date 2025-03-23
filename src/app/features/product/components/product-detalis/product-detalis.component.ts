import { CartService } from './../../../cart/services/cart.service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from './../../services/products.service';
import { Product } from '../../models/product';
import { ToastrService } from 'ngx-toastr';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-product-detalis',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './product-detalis.component.html',
  styleUrls: ['./product-detalis.component.css']
})
export class ProductDetalisComponent implements OnInit, OnDestroy {

  productId!: string | null;
  productDetails: Product = {} as Product;
  isLoading: boolean = false;

  private readonly CartService = inject(CartService);
  private readonly toastr = inject(ToastrService);
  private readonly ActivatedRoute = inject(ActivatedRoute);
  private readonly ProductsService = inject(ProductsService);

  private routeSubscription!: Subscription;

  showToastr(msg: string) {
    this.toastr.success(msg, '', {
      progressBar: true,
      timeOut: 1500
    });
  }

  getProductId() {
    this.routeSubscription = this.ActivatedRoute.paramMap.subscribe({
      next: (urlData) => {
        this.productId = urlData.get('id');
        if (this.productId) {
          this.getProductDetails(this.productId);
        }
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

  getProductDetails(id: string) {
    this.isLoading = true;
    this.ProductsService.getProdcustsDetails(id).subscribe({
      next: ({ data }) => {
        this.productDetails = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading product details:', error);
        this.isLoading = false;
      }
    });
  }

  ngOnInit(): void {
    this.getProductId();
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}
