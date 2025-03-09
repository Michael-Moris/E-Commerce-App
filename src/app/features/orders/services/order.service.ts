import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { AuthService } from '../../../core/auth/services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  createCheckout(cartId: string, shippingAddress: { details: string, phone: string, city: string }): Observable<any> {
    const returnUrl = "?url=http://localhost:4200"
    return this.http.post(environment.baseUrl + 'orders/checkout-session/' + cartId + returnUrl,
      {
        shippingAddress
      },)
  }

  getUserOrders(id: string): Observable<any> {
    return this.http.get(`${environment.baseUrl}orders/user/${id}`)
  }
}
