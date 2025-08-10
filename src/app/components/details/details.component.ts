import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../services/productService/products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
   standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  product: any;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.loadProductDetails(productId);
    } 
    else {
      this.isLoading = false;
    }
  }

  loadProductDetails(id: string) {
    this.isLoading = true;
    this.productsService.getAllProducts().subscribe((res: any) => {
      const allUsers = res;
      const allProducts = allUsers.flatMap((u: any) => u.sellingProducts);
      this.product = allProducts.find((p: any) => p.id === id);
      this.isLoading = false;
    });
  }
  addToCart() {
    
    console.log('Add to cart clicked for product:', this.product);
  }
}