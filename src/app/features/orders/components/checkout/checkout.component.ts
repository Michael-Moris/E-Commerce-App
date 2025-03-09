import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ValidationMessagesComponent } from '../../../../shared/components/validation-messages/validation-messages.component';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, ValidationMessagesComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  checkoutForm!: FormGroup
  cartId!: string;
  resMsg: string = '';
  isLoading = true

  private readonly orderService = inject(OrderService)
  private readonly activatedRoute = inject(ActivatedRoute)

  ngOnInit(): void {
    this.getCartId()
    this.formInit()
  }

  formInit() {
    this.checkoutForm = new FormGroup({
      details: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
    });
  }

  getCartId() {
    this.activatedRoute.paramMap.subscribe({
      next: (data) => {
        this.cartId = data.get('id')!;
      }
    })
  }

  submitForm() {
    this.isLoading = false
    if (this.checkoutForm.valid || !this.isLoading) {
      this.orderService.createCheckout(this.cartId, this.checkoutForm.value).subscribe({
        next: (res) => {
          this.isLoading = true
          open(res.session.url, '_self')
        }
      })
    }
  }
}
