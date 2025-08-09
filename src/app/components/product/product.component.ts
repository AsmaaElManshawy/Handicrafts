import { Component, OnInit } from '@angular/core';
import { CardComponent } from "../card/card.component";
import { ProductsService } from '../../services/productService/products.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  sellerNames: any[] = [];
  isLoading = true;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const category = params['category'];
      if (category) {
        this.loadProductsByCategory(category);
      } else {
        this.loadAllProducts();
      }
    });
  }

  loadAllProducts() {
    this.isLoading = true;
    this.productsService.getAllProducts().subscribe((res: any) => {
      const allUsers = res;
      this.products = allUsers.flatMap((user: any) =>
        user.sellingProducts.map((prod: any) => ({
          ...prod,
          sellerName: user.userName // fixed from user.name
        }))
      );
      this.isLoading = false;

    });
  }

  loadProductsByCategory(categoryName: string) {
    this.isLoading = true;
    this.productsService.getAllProducts().subscribe((res: any) => {
      const allUsers = res;
      const allProducts = allUsers.flatMap((u: any) => u.sellingProducts);
      this.products = allProducts.filter(
        (p: any) => p.category?.toLowerCase() === categoryName.toLowerCase()
      );
      this.isLoading = false;
    });
  }
}
