import { ProductsService } from './../../services/products.service';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-detalis',
  imports: [],
  templateUrl: './product-detalis.component.html',
  styleUrl: './product-detalis.component.css'
})
export class ProductDetalisComponent {

  productId!: string | null
  productDetails: Product = {} as Product
  private readonly ActivatedRoute = inject(ActivatedRoute);
  private readonly ProductsService = inject(ProductsService);

  getProductId() {
    this.ActivatedRoute.paramMap.subscribe({
      next: (urlData) => {
        this.productId = urlData.get('id');
      }
    })
    // console.log(this.ActivatedRoute.snapshot.paramMap.get('id'));

  }


  getProductDetails(id: string | null) {
    this.ProductsService.getProdcustsDetails(id).subscribe({
      next: ({data}) => {
        this.productDetails = data
      }
    })
  }


  ngOnInit(): void {
    this.getProductId()
    this.getProductDetails(this.productId)
  }
}
