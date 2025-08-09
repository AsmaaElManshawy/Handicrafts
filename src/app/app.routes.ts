import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { CategoryComponent } from './components/category/category.component';
import { CartComponent } from './components/cart/cart.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ProductTableComponent } from './components/product-table/product-table.component';
import { DetailsComponent } from './components/details/details.component';
import { UserInputComponent } from './components/user-input/user-input.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'cart', component: CartComponent },
  { path: 'product/:id', component: AddProductComponent },
  { path: 'productDetails/:id', component: DetailsComponent },
  { path: 'adminProduct', component: ProductTableComponent },
  { path: 'userInput', component: UserInputComponent },
  { path: '**', component: NotfoundComponent },
];
