import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { AuthService } from '../../../core/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http: HttpClient, private auth: AuthService) { }

  addProductToCart(productId: string) {

    return this.http.post(environment.baseUrl + "cart",
      {
        productId
      },
      {
        headers: {
          token: this.auth.getToken()!
        }
      })
  }

  updateCartQuantity(productId: string, count: number) {

    return this.http.put(environment.baseUrl + "cart/" + productId,
      {
        count
      },
      {
        headers: {
          token: this.auth.getToken()!
        }
      })
  }

  getloggedUserCart() {

    return this.http.get(environment.baseUrl + "cart",
      {
        headers: {
          token: this.auth.getToken()!
        }
      })
  }

  removeCartItem(productId: string, count: number) {
    return this.http.delete(environment.baseUrl + "cart/" + productId,
      {
        headers: {
          token: this.auth.getToken()!
        }
      })
  }

  clearCart() {
    return this.http.delete(environment.baseUrl + "cart",
      {
        headers: {
          token: this.auth.getToken()!
        }
      })
  }
}
