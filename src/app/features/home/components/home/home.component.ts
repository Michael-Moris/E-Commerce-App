import { Component, OnInit, inject } from '@angular/core';
import { ProductListComponent } from "../../../product/components/product-list/product-list.component";
import { MainSliderComponent } from "../main-slider/main-slider.component";
import { CategorySliderComponent } from "../category-slider/category-slider.component";
import { BrandsSliderComponent } from "../brands-slider/brands-slider.component";
import { ProductsService } from '../../../product/services/products.service';
import { Product } from '../../../product/models/product';

@Component({
  selector: 'app-home',
  imports: [
    ProductListComponent,
    MainSliderComponent,
    CategorySliderComponent,
    BrandsSliderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  allProducts: Product[] = [];

  private readonly productsService = inject(ProductsService);

  ngOnInit(): void {
    this.productsService.getProducts().subscribe({
      next: (res) => {
        this.allProducts = res.data;
      }
    });
  }
}
