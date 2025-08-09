import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../services/categoryService/categories.service';
import { ProductsService } from '../../services/productService/products.service';
import { CardComponent } from '../card/card.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterModule, CardComponent, FormsModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: any[] = [];
  products: any[] = [];
  isLoading = true;
  error: string | null = null;
  searchTerm: string = '';

  constructor(
    private categoryService: CategoriesService,
    private productService: ProductsService,
    private route: ActivatedRoute
  ) { }
  filteredCategories: any[] = [];

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const category = params['category'];
      if (category) {
        this.loadProductsByCategory(category);
      } else {
        this.loadCategories();
      }
    });
  }

  loadCategories() {
    this.isLoading = true;
    this.error = null;

    this.categoryService.getAllCategories().subscribe({
      next: (res: any) => {
        this.categories = res;
        this.filteredCategories = res;
        this.isLoading = false;
      },
      error: () => {
        this.error = 'Failed to load categories. Please try again later';
        this.isLoading = false;
      }
    });
  }

  onSearchTermChange(): void {
    const term = this.searchTerm.trim().toLowerCase();
    this.filteredCategories = this.categories.filter(cat =>
      cat.name.toLowerCase().includes(term)
    );
  }


  loadProductsByCategory(categoryName: string) {
    this.isLoading = true;
    this.error = null;

    this.productService.getAllProducts().subscribe({
      next: (res) => {
        const allUsers = res as any[];
        const allProducts = allUsers.flatMap((u: any) => u.sellingProducts);
        this.products = allProducts.filter(
          (p: any) =>
            p &&
            typeof p.category === 'string' &&
            p.category.toLowerCase() === categoryName.toLowerCase()
        );
        this.isLoading = false;
      },
      error: () => {
        this.error = 'Failed to load products.';
        this.isLoading = false;
      }
    });
  }

  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.loadProductsByCategory(this.searchTerm.trim());
    }
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.products = [];
    this.loadCategories();
  }
}
