import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from './../../services/products.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-detalis',
  imports: [],
  templateUrl: './product-detalis.component.html',
  styleUrls: ['./product-detalis.component.css']
})
export class ProductDetalisComponent {

  productId!: string | null;
  productDetails: Product = {} as Product;
  isLoading: boolean = false;

  private readonly ActivatedRoute = inject(ActivatedRoute);
  private readonly ProductsService = inject(ProductsService);

  getProductId() {
    this.ActivatedRoute.paramMap.subscribe({
      next: (urlData) => {
        this.productId = urlData.get('id');
        if (this.productId) {
          this.getProductDetails(this.productId);
        }
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
}
