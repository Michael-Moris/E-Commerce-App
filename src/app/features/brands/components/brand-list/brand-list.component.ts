import { Component, inject } from '@angular/core';
import { BrandCardComponent } from "../brand-card/brand-card.component";
import { Brand } from '../../../product/models/product';
import { BrandsService } from '../../services/brands.service';

@Component({
  selector: 'app-brand-list',
  imports: [BrandCardComponent],
  templateUrl: './brand-list.component.html',
  styleUrl: './brand-list.component.css'
})
export class BrandListComponent {
  allBrands: Brand[] = [];

  private readonly brandService = inject(BrandsService);

  getAllBrands() {
    this.brandService.getBrands().subscribe({
      next: ({ data }) => {
        this.allBrands = data;
      }
    })
  }



  ngOnInit(): void {
    this.getAllBrands();

  }
}
