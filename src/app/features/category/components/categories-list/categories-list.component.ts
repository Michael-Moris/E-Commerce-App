import { Component, inject } from '@angular/core';
import { Category } from '../../../product/models/product';
import { CategoriesService } from '../../services/categories.service';
import { CategoriesCardComponent } from "../categories-card/categories-card.component";

@Component({
  selector: 'app-categories-list',
  imports: [CategoriesCardComponent],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.css'
})
export class CategoriesListComponent {
  allCategories: Category[] = [];

  private readonly categoriesService = inject(CategoriesService);

  getAllCategories() {
    this.categoriesService.getCategories().subscribe({
      next: ({ data }) => {
        this.allCategories = data;
      }
    })
  }

  ngOnInit(): void {
    this.getAllCategories();

  }

}
