import { Component, inject, Input } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Brand } from '../../../product/models/product';
import { BrandsService } from '../../../brands/services/brands.service';

@Component({
  selector: 'app-brands-slider',
  imports: [CarouselModule],
  templateUrl: './brands-slider.component.html',
  styleUrl: './brands-slider.component.css'
})
export class BrandsSliderComponent {
  allBrands: Brand[] = [];
  @Input() brand!: Brand;

  private readonly brandsService = inject(BrandsService)

  getAllBrands() {
    this.brandsService.getBrands().subscribe({
      next: ({ data }) => {
        this.allBrands = data;
      }
    })
  }

  ngOnInit(): void {
    this.getAllBrands();
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 1500,
    autoplayHoverPause: true,
    navSpeed: 700,
    nav: false,
    navText: ['', ''],
    responsive: {
      0: {
        items: 3
      },
      400: {
        items: 3
      },
      500: {
        items: 4
      },
      740: {
        items: 5
      },
      940: {
        items: 10
      }
    },
  }
}
