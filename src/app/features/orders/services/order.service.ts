import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { AuthService } from '../../../core/auth/services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly authService = inject(AuthService)
  private readonly httpClient = inject(HttpClient)

  constructor() { }

  createCheckout(
    cartId: string,
    shippingAddress: {
      details: string,
      phone: string,
      city: string,
    }
  ): Observable<any> {
    const returnUrl = encodeURIComponent(`${window.location.origin}/#/`);
    return this.httpClient.post(
      `${environment.baseUrl}orders/checkout-session/${cartId}?url=${returnUrl}`,
      {
        shippingAddress
      },)
  }

  getUserOrders(id: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}orders/user/${id}`)
  }
}
