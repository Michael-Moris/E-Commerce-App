import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../features/product/models/product';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: Product[], searchTerm: string): Product[] {
    if (!searchTerm) return products; // Optional, but improves code clarity and avoids unnecessary filtering

    const lowerTerm = searchTerm.toLowerCase();

    return products.filter((item) =>
      item.title.toLowerCase().includes(lowerTerm)
    );
  }
}
