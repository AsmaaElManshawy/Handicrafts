import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { IProduct } from '../../interfaces/IProduct/iproduct';
import { IUser } from '../../interfaces/IUser/iuser';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent  implements OnInit{

    private readonly serviceU = inject(UserService)
    user:IUser = JSON.parse(localStorage.getItem('user') || '{}')
    userID:number = Number(this.user.userId);
    useridd:string = this.user.id;

  // user:any;
  // userID:number = 1;
  // useridd:string = "9ab8";
  // productList!:IProduct[];

  successMessage!:string;
  productList:IProduct[] = this.user.sellingProducts;
  productId:any;
  productIndex!:number;
  editedProduct!:IProduct;
  addedProduct!:IProduct;
  price:number = 0;
  quantity:number = 0;

  constructor(private readonly router:Router,private readonly activatedroute:ActivatedRoute){
    this.productId=this.activatedroute.snapshot.params['id']
    console.log( 'product id ==  ' + this.productId)
  }

  myform = new FormGroup({
    name:new FormControl('',[Validators.required,Validators.minLength(3)]),
    category:new FormControl('',[Validators.required,Validators.minLength(3)]),
    price:new FormControl('',[Validators.required]),
    description:new FormControl('',[Validators.required]),
    quantity:new FormControl('',[Validators.required,Validators.min(1)]),
    coverImage:new FormControl('',[Validators.required,Validators.minLength(10)]),
    images:new FormControl([''], [Validators.required,Validators.minLength(10)])
  })

  ngOnInit(): void {
    // this.getAllProducts();
    if(this.productId != 0){
      this.productById(this.productId)
      this.getName.setValue(this.editedProduct.name)
      this.getPrice.setValue(this.editedProduct.price.toString())
      this.getDescription.setValue(this.editedProduct.description)
      this.getQuantity.setValue(this.editedProduct.quantity.toString())
      this.getCategory.setValue(this.editedProduct.category)
      this.getCoverImage.setValue(this.editedProduct.coverImage)
      this.getImages.setValue(this.editedProduct.images)
    } else {
      console.log("product id == 0")
    }
  }

  // getAllProducts():void{
  //   this.serviceU.getUserById(this.useridd).subscribe({
  //     next:(res)=>{
  //       console.log('Product List: get all products')
  //       this.user = res;
  //       this.productList = this.user.sellingProducts
  //       this.useridd = this.user.id
  //       this.userID = Number(this.user.userId);
  //       console.log(this.productList)
  //     },
  //     error:(err) => {
  //       console.log(err)
  //     },
  //   })
  // }

  get getName(){
    return this.myform.controls['name']
  }

  get getCoverImage(){
    return this.myform.controls['coverImage']
  }

  get getImages(){
    return this.myform.controls['images']
  }

  get getCategory(){
    return this.myform.controls['category']
  }

  get getPrice(){
    return this.myform.controls['price']
  }

  get getDescription(){
    return this.myform.controls['description']
  }

  get getQuantity(){
    return this.myform.controls['quantity']
  }

  reShape(input:any , status:string):IProduct{
    // take form.value
    let newprod:IProduct = input.value;
    if (status === 'add') {
      newprod.id = this.addid(this.productList);
    } else {
      newprod.id = this.productId;
    }
    this.price = Number(input.value.price);
    this.quantity = Number(input.value.quantity);
    newprod.rating = 3;
    newprod.price = this.price;
    newprod.quantity = this.quantity;
    return newprod;
  }

  onSubmit(form:any){
    console.log(form);
    if(form.valid){
      if(this.productId==0){
        console.log('add product');
        this.addedProduct = this.reShape(form.value,'add');
        console.log(this.addedProduct);
        this.addSellingProduct(this.addedProduct);
      } else {
        console.log('edit product');
        this.editedProduct = this.reShape(form.value,'edit');
        console.log(this.addedProduct);
        this.editSellingProduct();
      }
    } else {
      console.log('Form Invalid');
    }
  }

  productById(id:string){
    this.productIndex  = this.productList.findIndex((p:IProduct)=> p.id == id);
    this.editedProduct = this.productList[this.productIndex];
    console.log(this.productIndex);
    console.log(this.editedProduct);
  }

  editSellingProduct():void{
    this.productList[this.productIndex] = this.editedProduct
    this.user.sellingProducts = this.productList
    this.serviceU.editUser(this.user,this.useridd).subscribe({
      next:()=>{
        console.log('Product List: edit Selling Product')
        this.successMessage="product updated successfully"
          localStorage.setItem('user', JSON.stringify(this.user));
        setTimeout(()=>{
          this.router.navigate(['/adminProduct'])
        },2000)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  addSellingProduct(product:IProduct):void{
    this.productList[this.productList.length] = product
    this.user.sellingProducts = this.productList
    this.serviceU.editUser(this.user,this.useridd).subscribe({
      next:()=>{
        console.log('Product List: add Selling Product')
        // console.log(res);
        this.successMessage="product added successfully"
          localStorage.setItem('user', JSON.stringify(this.user));
        setTimeout(()=>{
          this.router.navigate(['/adminProduct'])
        },2000)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  addid (arr:IProduct[]):string{
    // return id for added product
    const index = arr.length - 1;
    const idLength = arr[index].id.length ;
    const lastIndex = arr[index].id.length - 1 ;
    const id = Number(arr[index].id)
      if (arr.length >= 9 && arr[index].id[lastIndex] == '9') {
        const increment = Math.pow( 10, idLength)
        const idof = this.userID * increment;
        return (idof + 1).toString();
      }else{
        return (id + 1).toString();
      }
  }

}

