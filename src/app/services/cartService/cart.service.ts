import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ICart, ICartProduct, IUser } from '../../interfaces/IUser/iuser';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  //  for cart page
  //  service for managing user's buying products

  private readonly url = `${environment.baseUrl}/user`;
  constructor(private readonly http: HttpClient) {}

  getUserCartById(userId: string) {
    //  a specific user's cart
    return this.http.get(`${this.url}/${userId}/cart`);
  }

  addProductToCart(prod: ICartProduct, userId: string) {
    // add a new product to user cart
    return this.http.post(`${this.url}/${userId}/cart/myProducts`, prod);
  }

  deleteProductFromCart(userId: string, productId: string) {
    // remove a product from user cart
    return this.http.delete(
      `${this.url}/${userId}/cart/myProducts/${productId}`
    );
  }
}
