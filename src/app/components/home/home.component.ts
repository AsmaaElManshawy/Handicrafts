import { Component, Input, OnInit } from '@angular/core';
import { CardHomeComponent } from "../card-home/card-home.component";
import { CommonModule } from '@angular/common';
import { IProduct } from '../../interfaces/IProduct/iproduct';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/productService/products.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardHomeComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  newArrival: any | null = null;
  isLoading = true;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.loadAllProducts();
  }
  loadAllProducts() {
    this.isLoading = true;
    this.productsService.getAllProducts().subscribe((res: any) => {
      this.products = res; // Store all products
      if (this.products.length > 0) {
        this.loadNewArrival(this.products[0].id); // Load the first product
      }
    });
    console.log("product fetched");
  }

  loadNewArrival(id: string): void {
    this.productsService.getById(id).subscribe(
      (product: any) => {
        this.newArrival = product; // Store the first product details
      },
      (error) => {
        console.error('Error fetching new arrival:', error);
      }
    );
  }
}
