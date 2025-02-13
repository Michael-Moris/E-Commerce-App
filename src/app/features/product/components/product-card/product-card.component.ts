import { RouterLink } from '@angular/router';
import { Product } from './../../models/product';
import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!: Product;
}
