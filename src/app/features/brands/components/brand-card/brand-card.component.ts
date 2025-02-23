import { Component, Input } from '@angular/core';
import { Brand } from '../../../product/models/product';


@Component({
  selector: 'app-brand-card',
  imports: [],
  templateUrl: './brand-card.component.html',
  styleUrl: './brand-card.component.css'
})
export class BrandCardComponent {

  @Input() brand!: Brand;
}
