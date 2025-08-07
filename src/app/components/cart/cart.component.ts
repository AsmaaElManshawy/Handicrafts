
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IProduct } from '../../interfaces/IProduct/iproduct';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  //   interface CartItem {
  //   id: number;
  //   name: string;
  //   price: number;
  //   quantity: number;
  // }
  cartItems: IProduct[] = [
    {
      id: "1",
      name: "string",
      price: 10,
      quantity: 10,
      rating: 10,
      description: "kdoksodkpoek",
      coverImage: "string",
      images: ["dmkldmd"],
      category: 'kodskcoskodp'
    }
  ];

  totalPrice: number = 0;

  constructor() {
    this.calculateTotal();
  }

  updateQuantity(itemId: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    const newQuantity = parseInt(input.value, 10);

    if (isNaN(newQuantity) || newQuantity < 1) return;

    const item = this.cartItems.find(item => item.id === itemId);
    if (item) {
      item.quantity = newQuantity;
      this.calculateTotal();
    }
  }

  removeFromCart(itemId: string): void {
    this.cartItems = this.cartItems.filter(item => item.id !== itemId);
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.totalPrice = this.cartItems.reduce(
      (total, item) => total + (item.price * item.quantity),
      0
    );
  }
}