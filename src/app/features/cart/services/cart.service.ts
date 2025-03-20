import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../core/auth/services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartCounter: WritableSignal<number> = signal<number>(0)

  constructor(private http: HttpClient, private auth: AuthService) { }

  addProductToCart(productId: string): Observable<any> {

    return this.http.post(environment.baseUrl + "cart",
      {
        productId
      })
  }

  updateCartQuantity(productId: string, count: number): Observable<any> {
    return this.http.put(environment.baseUrl + "cart/" + productId,
      {
        count
      })
  }

  getloggedUserCart(): Observable<any> {
    return this.http.get(environment.baseUrl + "cart")
  }

  removeCartItem(productId: string): Observable<any> {
    return this.http.delete(environment.baseUrl + "cart/" + productId)
  }

  clearCart(): Observable<any> {
    return this.http.delete(environment.baseUrl + "cart")
  }
}
