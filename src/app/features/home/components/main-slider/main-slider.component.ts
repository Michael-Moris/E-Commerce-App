import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-main-slider',
  imports: [CarouselModule],
  templateUrl: './main-slider.component.html',
  styleUrl: './main-slider.component.css'
})
export class MainSliderComponent {

  customOptions: OwlOptions = {

    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: ['<i class="fa-regular fa-circle-left fa-xl text-white/50 hover:text-main/50 transition-all duration-300"></i>', '<i class="fa-regular fa-circle-right fa-xl text-white/50 hover:text-main/50 transition-all duration-300"></i>'],
    nav: true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
  }

}
