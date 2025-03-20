import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishListService {
  wishListCounter: WritableSignal<number> = signal<number>(0);

  constructor(private http: HttpClient) { }

  addToWishList(productId: string): Observable<any> {
    return this.http.post(environment.baseUrl + "wishlist", {
      productId
    });
  }

  removeFromWishList(productId: string): Observable<any> {
    return this.http.delete(environment.baseUrl + "wishlist/" + productId);
  }

  getLoggedUserWishList(): Observable<any> {
    return this.http.get(environment.baseUrl + "wishlist");
  }
}