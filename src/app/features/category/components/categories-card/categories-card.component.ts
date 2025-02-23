import { Component, Input } from '@angular/core';
import { Category } from '../../../product/models/product';

@Component({
  selector: 'app-categories-card',
  imports: [],
  templateUrl: './categories-card.component.html',
  styleUrl: './categories-card.component.css'
})
export class CategoriesCardComponent {
  @Input() category!: Category;



}
