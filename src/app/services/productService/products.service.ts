import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../../interfaces/IProduct/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  // all website means all admins's products
  // service to display all website's product related operations

  private readonly url = `${environment.baseUrl}/user/sellingProducts`;
  constructor(private readonly http:HttpClient) { }

  getAllProducts(){
    return this.http.get(this.url);
  }

  getById(id:string){
    return this.http.get(`${this.url}/${id}`);
  }

}
