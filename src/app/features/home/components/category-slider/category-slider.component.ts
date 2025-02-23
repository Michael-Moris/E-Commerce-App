import { Component, inject, Input } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Category } from '../../../product/models/product';
import { CategoriesService } from '../../../category/services/categories.service';

@Component({
  selector: 'app-category-slider',
  imports: [CarouselModule],
  templateUrl: './category-slider.component.html',
  styleUrl: './category-slider.component.css'
})
export class CategorySliderComponent {
  allCategories: Category[] = [];
  @Input() category!: Category;

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
  
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 2500,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      500: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: false
  }
}
