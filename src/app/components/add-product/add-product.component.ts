import { Component, OnInit } from '@angular/core';
import { AdminProductService } from '../../services/adminProduct/admin-product.service';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { IProduct } from '../../interfaces/IProduct/iproduct';
import { IUser } from '../../interfaces/IUser/iuser';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent  implements OnInit{

  productId:any;
  successMessage!:string;
  myProduct!:IProduct;
  addedProduct!:IProduct
  user:IUser = JSON.parse(localStorage.getItem('user') || '{}')
  userID:number = Number(this.user.userId);
  productList:any;
  price:number = 0;
  quantity:number = 0;

  constructor( public readonly service:AdminProductService,public readonly router:Router,public readonly activatedroute:ActivatedRoute){
    this.productId=this.activatedroute.snapshot.params['id']
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
    console.log(this.productId);
    this.getAllProducts();
    if(this.productId != 0){
      this.productById(this.productId)
      this.getName.setValue(this.myProduct.name)
      this.getPrice.setValue(this.myProduct.price.toString())
      this.getDescription.setValue(this.myProduct.description)
      this.getQuantity.setValue(this.myProduct.quantity.toString())
      this.getCategory.setValue(this.myProduct.category)
      this.getCoverImage.setValue(this.myProduct.coverImage)
      this.getImages.setValue(this.myProduct.images)
    }
  }

  getAllProducts():void{
    this.service.getSellingProducts(this.user.userId).subscribe({
      next:(res)=>{
        console.log('Product List: get all products')
        console.log(res)
        this.productList = res
      },
      error:(err) => {
        console.log(err)
      },
    })
  }

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
  if (status === 'add') {
    this.addedProduct.id = this.addid(this.productList);
  } else {
    this.addedProduct.id = this.productId;
  }
  this.price = Number(input.value.price);
  this.quantity = Number(input.value.quantity);
  this.addedProduct = input.value
  this.addedProduct.rating = 2;
  this.addedProduct.price = this.price;
  this.addedProduct.quantity = this.quantity;
  return this.addedProduct;
}

  onSubmit(form:any){
    console.log(form);
    if(form.valid){
      if(this.productId==0){
        console.log('add product');
        this.addedProduct = this.reShape(form.value,'add');
        console.log(this.addedProduct);
        this.addSellingProduct(this.addedProduct, this.user.userId);
      } else {
        console.log('edit product');
        this.addedProduct = this.reShape(form.value,'edit');
        console.log(this.addedProduct);
        this.editSellingProduct(this.addedProduct, this.productId, this.user.userId);
      }
    } else {
      console.log('Form Invalid');
    }
  }

  productById(id:string){
    this.service.getSellingProductsById( id , this.user.userId).subscribe({
      next:(res)=>{
        console.log(res);
        //  [0] ?????????????????
        this.myProduct  = this.productList.filter((p:IProduct)=> p.id != id)[0];
      },
      error:(err)=>{
        console.log(err)
      },
    });
  }

  editSellingProduct(product:IProduct,prodid:string,userid:string):void{
    this.service.editSellingProduct(product,prodid,userid).subscribe({
      next:()=>{
        console.log('Product List: edit Selling Product')
        // console.log(res);
        this.successMessage="product updated successfully"
        setTimeout(()=>{
          this.router.navigate(['/adminProduct'])
        },2000)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  addSellingProduct(product:IProduct,userid:string):void{
    this.service.addSellingProduct(product,userid).subscribe({
      next:()=>{
        console.log('Product List: add Selling Product')
        // console.log(res);
        this.successMessage="product added successfully"
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

