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
  newArrival?: any[] | null = null;
  isLoading = true;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.loadNewArrival(true);
  }

  loadNewArrival(newArrival: boolean): void {
    this.isLoading = true;
    this.productsService.getAllProducts().subscribe(
      (res: any) => {
        const allUsers = res;
        const allProducts = allUsers.flatMap((u: any) => u.sellingProducts);
        this.newArrival = allProducts.filter(
          (p: any) => p.new === newArrival
        );
        this.isLoading = false; // Store the first product details
      },
      (error) => {
        console.error('Error fetching new arrival:', error);
      }
    );
  }
}
