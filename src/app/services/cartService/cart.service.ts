import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ICart, ICartProduct } from '../../interfaces/ICart/icart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
//  service for managing user's buying products

  private readonly url = `${environment.baseUrl}/cart`;
  constructor(private readonly http:HttpClient) { }

  getAllCartItems(){
    // all users cart
    return this.http.get(this.url);
  }

  getCartById(id:string){
    //  a specific user's cart
    return this.http.get(`${this.url}/${id}`);
  }

  addUserToCart(newUser: ICart) {
    // add a new user cart
    return this.http.post(this.url, newUser);
  }

  deleteUserFromCart(id: string) {
    // remove a user cart
    return this.http.delete(`${this.url}/${id}`);
  }

  addProductToCart(prod: ICartProduct , userId:string) {
    // add a new product to user cart
    return this.http.post(`${this.url}/${userId}/myProducts`, prod);
  }
  
  deleteProductFromCart(userId: string, productId: string) {
    // remove a product from user cart
    return this.http.delete(`${this.url}/${userId}/myProducts/${productId}`);
  }
}
