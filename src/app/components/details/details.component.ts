import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductsService } from '../../services/productService/products.service';
import { CommonModule } from '@angular/common';
import { IUser, ICart, ICartProduct } from '../../interfaces/IUser/iuser';
import { UserService } from '../../services/user/user.service';
import { FormsModule } from '@angular/forms';
import { IProduct } from '../../interfaces/IProduct/iproduct';

@Component({
  selector: 'app-details',
   standalone: true,
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  isLoading = true;
  user!:IUser
  userCart!:ICart
  cartProducts!:ICartProduct[]
  quantity: number = 1;
  totalPrice: number = 0 ;
  count: number = 0 ;
  seller!:IUser
  buiedIndex!:number
  allSellerProducts!:IProduct[]
  product: any;
  private readonly service = inject(UserService)

  constructor(
    private readonly route: ActivatedRoute,
    private readonly productsService: ProductsService,
    private readonly router:Router
  ) {}
// done
  ngOnInit(): void {
    console.log('from   oninit')
    this.user  = JSON.parse(localStorage.getItem('user') || '{}')
    console.log('user  ' , this.user)
    this.userCart  = this.user.cart || { myProducts: [], totalPrice: 0 };
    console.log('userCart  ' , this.userCart)
    this.cartProducts  = this.userCart.myProducts || [] ;
    console.log('cartProducts  ' , this.cartProducts)
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      // this.loadProductDetails(productId);
      this.getSeller(productId)
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
// done adding in user cart and decrease count in seller product
  addToCart(prodID:string,prodPrice:number){
    console.log('from   add to cart')
    let addedprod:ICartProduct = {
      productId:prodID,
      name: this.product.name,
      image: this.product.coverImage,
      quantity:this.quantity,
      price:prodPrice
    }
    console.log( 'addedprod  ' , addedprod)
    this.cartProducts.push(addedprod);
    console.log('cartProducts  ',this.cartProducts)
    console.log( 'Seller Product  befor selling ' , this.allSellerProducts[this.buiedIndex])
    this.allSellerProducts[this.buiedIndex].quantity -= this.quantity
    console.log( 'Seller Product after selling ' , this.allSellerProducts[this.buiedIndex])
    this.editDB("seller")
    this.calculateTotal();
    this.userCart.myProducts = this.cartProducts;
    console.log( 'userCart.myProducts  ' , this.userCart.myProducts)
    this.editDB('user');
  }
// done
  calculateTotal(): void {
    console.log('from   calculateTotal')
    this.totalPrice = this.cartProducts.reduce((acc, item) => acc + item.price * item.quantity, 0);
    console.log( 'totalPrice  ' , this.totalPrice)
    this.userCart.totalPrice = this.totalPrice;
    console.log( 'usercart totalPrice ' , this.userCart.totalPrice)
  }
// done
  editDB(status:string){
    console.log('to   database')
    if (status === 'user') {
      this.user.cart = this.userCart
      console.log( 'user cart' , this.user.cart)
      console.log( 'user   ' , this.user)
      this.service.editUser(this.user,this.user.id).subscribe({
        next:()=> {
          localStorage.setItem('user', JSON.stringify(this.user));
          console.log('edited in database')
          setTimeout(()=>{
            this.router.navigate(['/cart'])
          },2000)
        },
        error:(err)=> {
          console.log(err)
        },
      })
    } else {
        this.seller.sellingProducts = this.allSellerProducts
        console.log( 'seller  products' , this.seller.sellingProducts)
        console.log( 'seller  ' , this.seller)
        this.service.editUser(this.seller,this.seller.id).subscribe({
          next:()=> {
            console.log('edited in database')
          },
          error:(err)=> {
            console.log(err)
          },
        })
    }
  }
// done
  getSeller(id:string){
    console.log('from   database')
    this.isLoading = true;
    this.service.getAllUsers().subscribe({
      next:(res) => {
        let data:any = res  ;
        for (let i = 0; i < data.length; i++) {
          if (data[i].sellingProducts.find((p: IProduct) => p.id === id) != undefined) {
            this.seller = data[i]
            this.allSellerProducts = data[i].sellingProducts
            this.buiedIndex = this.allSellerProducts.findIndex((p: IProduct) => p.id === id)
            this.product = this.allSellerProducts[this.buiedIndex]
            console.log('seller  ' , this.seller)
            console.log('all Seller Products  ' , this.allSellerProducts)
            console.log('product  ' , this.product)
            this.isLoading = false;
            break;
          }
        }
      },
      error:(err)=> {
        console.log(err)
      },
    })
  }


}
