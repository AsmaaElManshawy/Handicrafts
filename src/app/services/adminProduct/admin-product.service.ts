import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IProduct } from '../../interfaces/IProduct/iproduct';

@Injectable({
  providedIn: 'root'
})
export class AdminProductService {
//  service for managing admin's selling products

  private readonly url = `${environment.baseUrl}/cart`;
  constructor(private readonly http:HttpClient) { }

  getSellingProducts(userId:string){
    return this.http.get(`${this.url}/${userId}/sellingProducts`);
  }

  getById(productId:string,userId:string){
    return this.http.get(`${this.url}/${userId}/sellingProducts/${productId}`);
  }

  addProduct(product:IProduct,userId:string){
    return this.http.post(`${this.url}/${userId}/sellingProducts`,product);
  }

  deleteProduct(productId:string,userId:string){
    return this.http.delete(`${this.url}/${userId}/sellingProducts/${productId}`);
  }

  editProduct(product:IProduct,productId:string,userId:string){
    product.id = productId;
    return this.http.patch(`${this.url}/${userId}/sellingProducts/${productId}`,product);
  }
}
