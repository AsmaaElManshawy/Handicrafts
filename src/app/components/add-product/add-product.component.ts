import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { IProduct } from '../../interfaces/IProduct/iproduct';
import { IUser } from '../../interfaces/IUser/iuser';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent  implements OnInit{

  private readonly serviceU = inject(UserService)
  user!:IUser
  userID!:number
  useridd!:string
  successMessage!:string;
  productList!:IProduct[];
  productId:any;
  productIndex!:number;
  prodImages!:string[]
  prodCoverImage!:string
  editedProduct!:IProduct;
  addedProduct!:IProduct;


  constructor(private readonly router:Router,private readonly activatedroute:ActivatedRoute){
    this.productId=this.activatedroute.snapshot.params['id']
    console.log( 'product id ==  ' + this.productId)
  }

  myform = new FormGroup({
    name:new FormControl<string | null>(null,[Validators.required,Validators.minLength(3)]),
    category:new FormControl<string | null>(null,[Validators.required,Validators.minLength(3)]),
    price:new FormControl<number | null>(null,[Validators.required]),
    description:new FormControl<string | null>(null,[Validators.required]),
    quantity:new FormControl<number | null>(null,[Validators.required,Validators.min(1)]),
    coverImage:new FormControl< string | null>(null,[Validators.required]),
    images:new FormArray<FormControl<string>>([], [Validators.required])
  })

  editform = new FormGroup({
    name:new FormControl<string | null>(null,[Validators.required,Validators.minLength(3)]),
    category:new FormControl<string | null>(null,[Validators.required,Validators.minLength(3)]),
    price:new FormControl<number | null>(null,[Validators.required]),
    description:new FormControl<string | null>(null,[Validators.required]),
    quantity:new FormControl<number | null>(null,[Validators.required,Validators.min(1)])
  })

  ngOnInit(): void {
      this.user = JSON.parse(localStorage.getItem('user') || '{}')
      this.userID = Number(this.user.userId);
      this.useridd = this.user.id;
      this.productList = this.user.sellingProducts;
    if(this.productId != 0){
      this.editedProduct = this.productById(this.productId)
      setTimeout(()=>{
        this.prodImages = this.editedProduct.images
        this.prodCoverImage = this.editedProduct.coverImage
        this.getEditName.setValue(this.editedProduct.name)
        this.getEditPrice.setValue(this.editedProduct.price)
        this.getEditDescription.setValue(this.editedProduct.description)
        this.getEditQuantity.setValue(this.editedProduct.quantity)
        this.getEditCategory.setValue(this.editedProduct.category)
        },500)
    }
  }

  get getCoverImage():FormControl{
    return this.myform.get('coverImage') as FormControl<string | null>;
  }

  get getImages(): FormArray{
    return this.myform.get('images') as FormArray<FormControl<string | null>>;
  }

// Handle cover image input
  onCoverImageSelected(event: any) {
    const url = event.target.files[0].name;
    this.getCoverImage.setValue(url);
  }

  // Handle multiple images input
  onImagesSelected(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.getImages.push(new FormControl(files[i].name));
    }
  }

  get getName():FormControl{
    return this.myform.controls['name']
  }

  get getCategory():FormControl{
    return this.myform.controls['category']
  }

  get getPrice():FormControl{
    return this.myform.controls['price']
  }

  get getDescription():FormControl{
    return this.myform.controls['description']
  }

  get getQuantity():FormControl{
    return this.myform.controls['quantity']
  }

  get getEditName():FormControl{
    return this.editform.controls['name']
  }

  get getEditCategory():FormControl{
    return this.editform.controls['category']
  }

  get getEditPrice():FormControl{
    return this.editform.controls['price']
  }

  get getEditDescription():FormControl{
    return this.editform.controls['description']
  }

  get getEditQuantity():FormControl{
    return this.editform.controls['quantity']
  }

  reShape(input:any , status:string):IProduct{
    // take form.value
    // name & desc & category & cover image & images
    let newprod:IProduct = input;
    if (status === 'add') {
      newprod.id = this.addid(this.productList);
    } else {
      newprod.id = this.productId;
      newprod.coverImage = this.prodCoverImage
      newprod.images = this.prodImages
    }
    newprod.rating = 3;
    newprod.price = input.price;
    newprod.price = input.price;
    return newprod;
  }
// in prodect edit can not edite images and cover image
  onSubmit(form:any){
    console.log(form.value);
    if(form.valid){
      if(this.productId==0){
        console.log('add product');
        this.addedProduct = this.reShape(form.value,'add');
        console.log( 'final shape' , this.addedProduct);
        this.addSellingProduct(this.addedProduct);
      } else {
        console.log('edit product');
        this.editedProduct = this.reShape(form.value,'edit');
        console.log( 'final shape' , this.addedProduct);
        this.editSellingProduct();
      }
    } else {
      console.log('Form Invalid');
      console.log(form.value);
    }
  }

  productById(id:string):IProduct{
    this.productIndex  = this.productList.findIndex((p:IProduct)=> p.id === id);
    let editedProd = this.productList[this.productIndex];
    console.log('Product index  =  ' + this.productIndex);
    console.log( 'edited Product =  ' , editedProd);
    return editedProd
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

