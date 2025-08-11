import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../services/productService/products.service';
import { CommonModule } from '@angular/common';
import { IUser, ICart, ICartProduct } from '../../interfaces/IUser/iuser';
import { UserService } from '../../services/user/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
   standalone: true,
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  product: any;
  isLoading = true;
  quantity: number = 1;

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


    private readonly service = inject(UserService)
    user:IUser = JSON.parse(localStorage.getItem('user') || '{}')
    userID:number = Number(this.user.userId);
    useridd:string = this.user.id;
    userCart:ICart = this.user.cart || { myProducts: [], totalPrice: 0 };
    cartProducts:ICartProduct[] = this.userCart.myProducts || [] ;
    totalPrice: number = 0 ;
    count: number = 0 ;

  addToCart(prodID:string,prodPrice:number){
    this.cartProducts.push({
      productId:prodID,
      name: this.product.name,
      image: this.product.coverImage,
      quantity:this.quantity,
      price:prodPrice
    });
    this.calculateTotal();
    this.userCart.myProducts = this.cartProducts;
    console.log(this.userCart);
    this.editDB();
  }

  calculateTotal(): void {
    this.totalPrice = this.cartProducts.reduce((acc, item) => acc + item.price * item.quantity, 0);
    this.userCart.totalPrice = this.totalPrice;
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
