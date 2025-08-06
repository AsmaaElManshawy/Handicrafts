import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ICategory } from '../../interfaces/ICategory/icategory';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
//  service for managing all categories

  private readonly url = `${environment.baseUrl}/categories`;
  constructor(private readonly http:HttpClient) { }

  getAllCategories(){
    return this.http.get(this.url);
  }

  getById(id:number) {
    return this.http.get(`${this.url}/${id}`);
  }

  getByName(name:string) {
    return this.http.get(`${this.url}/${name}`);
  }
  
  addCategory(category: ICategory) {
    return this.http.post(this.url, category);
  }
}
