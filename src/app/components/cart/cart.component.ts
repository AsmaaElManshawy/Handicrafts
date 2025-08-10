
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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

  private readonly service = inject(UserService)
  user:IUser = JSON.parse(localStorage.getItem('user') || '{}')
  userID:number = Number(this.user.userId);
  useridd:string = this.user.id;
  userCart:ICart = this.user.cart ;
  cartProducts:ICartProduct[] = this.userCart.myProducts
  totalPrice: number = 0 ;
  count: number = 0 ;
  productList!:IProduct[];
  allUsers:any
  constructor() {
    this.calculateTotal();
  }

  ngOnInit(): void {
    this.getAllProducts();
    }

  getAllProducts():void{
    this.service.getAllUsers().subscribe({
      next:(res)=>{
        console.log('Product List: get all products')
        this.allUsers= res;
        let users:IUser[] = this.allUsers
        for (let i = 0; i < users.length; i++){
          // let sellproduct:any = users[i].sellingProducts
          this.productList.push(...users[i].sellingProducts)
        }
      },
      error:(err) => {
        console.log(err)
      },
    })
  }

  addToCart(prodID:string,prodPrice:number,count:number){
    this.cartProducts.push({
      productId:prodID,
      quantity:count,
      price:prodPrice
    });
    this.calculateTotal();
    this.userCart.myProducts = this.cartProducts;
    this.editDB();
  }


// i dont understand this
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
    this.cartProducts = this.cartProducts.filter(item => item.productId !== itemId);
    this.calculateTotal();
    this.userCart.myProducts = this.cartProducts
    this.editDB();
  }

  calculateTotal(): void {
    for (let i = 0; i < this.cartProducts.length; i++) {
      this.totalPrice += this.cartProducts[i].price * this.cartProducts[i].quantity;
    }
    this.userCart.totalPrice = this.totalPrice
  }

  editDB(){
    this.user.cart = this.userCart
    this.service.editUser(this.user,this.useridd).subscribe({
      next:()=> {
        console.log('edited in database')
      },
      error:(err)=> {
        console.log(err)
      },
    })
  }
}
