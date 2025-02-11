import { Product } from '../../models/product';
import { ProductsService } from './../../services/products.service';
import { Component, inject } from '@angular/core';
import { ProductCardComponent } from "../product-card/product-card.component";

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  allProducts: Product[] = [];

  private readonly ProductsService = inject(ProductsService);


  getAllProcuts() {
    this.ProductsService.getProducts().subscribe({
      next: ({ data }) => {
        this.allProducts = data;
      }
    })
  }

  ngOnInit(): void {
    this.getAllProcuts();

  }
}