import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IProduct } from '../../interfaces/IProduct/iproduct';

@Injectable({
  providedIn: 'root',
})
export class AdminProductService {
  //  for product table
  //  service for managing admin's selling products

  private readonly url = `${environment.baseUrl}/user`;
  constructor(private readonly http: HttpClient) {}

  getSellingProducts(userId: string) {
    return this.http.get(`${this.url}/${userId}/sellingProducts`);
  }

  getSellingProductsById(productId: string, userId: string) {
    return this.http.get(`${this.url}/${userId}/sellingProducts/${productId}`);
  }

  addSellingProduct(product: IProduct, userId: string) {
    return this.http.post(`${this.url}/${userId}/sellingProducts`, product);
  }

  deleteSellingProduct(productId: string, userId: string) {
    return this.http.delete(
      `${this.url}/${userId}/sellingProducts/${productId}`
    );
  }

  editSellingProductsId(products: IProduct[], userId: string) {
    return this.http.patch(
      `${this.url}/${userId}/sellingProducts`,
      products
    );
  }

  editSellingProduct(product: IProduct, productId: string, userId: string) {
    return this.http.patch(
      `${this.url}/${userId}/sellingProducts/${productId}`,
      product
    );
  }
}
