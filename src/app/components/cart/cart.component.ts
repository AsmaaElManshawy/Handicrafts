
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { IProduct } from '../../interfaces/IProduct/iproduct';
import { ICart, ICartProduct, IUser } from '../../interfaces/IUser/iuser';
import { UserService } from '../../services/user/user.service';

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
export class CartComponent implements OnInit {


  private readonly service = inject(UserService)

  user!:IUser
  userCart!:ICart
  totalPrice: number = 0;
  cartItems!: ICartProduct[] ;


  constructor(private readonly router:Router) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userCart = this.user.cart || { myProducts: [], totalPrice: 0 };
    this.cartItems = this.userCart.myProducts;
    console.log(this.cartItems);
    this.calculateTotal();
    this.userCart.myProducts = this.cartItems
    this.user.cart = this.userCart
    this.editDB();
  }

  updateQuantity(itemId: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    const newQuantity = parseInt(input.value, 10);
    if (isNaN(newQuantity) || newQuantity < 1) return;
    const item = this.cartItems.find(item => item.productId === itemId);
    if (item) {
      item.quantity = newQuantity;
      this.calculateTotal();
      this.userCart.myProducts = this.cartItems
      this.user.cart = this.userCart
      this.editDB();
    }
  }

  removeFromCart(itemId: string): void {
    this.cartItems = this.cartItems.filter(item => item.productId !== itemId);
    this.calculateTotal();
    this.userCart.myProducts = this.cartItems
    this.user.cart = this.userCart
    this.editDB();
  }

  calculateTotal(): void {
    this.totalPrice = this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    this.userCart.totalPrice = this.totalPrice;
  }

  editDB(){
    this.user.cart = this.userCart
    this.service.editUser(this.user,this.user.id).subscribe({
      next:()=> {
        localStorage.setItem('user', JSON.stringify(this.user));
        console.log('edited in database')
      },
      error:(err)=> {
        console.log(err)
      },
    })
  }
}
