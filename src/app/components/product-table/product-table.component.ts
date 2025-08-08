import { Component ,inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminProductService } from '../../services/adminProduct/admin-product.service';
import { IUser } from '../../interfaces/IUser/iuser';
import { IProduct } from '../../interfaces/IProduct/iproduct';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.css'
})
export class ProductTableComponent implements OnInit {

  private readonly service = inject(AdminProductService)
  user:IUser = JSON.parse(localStorage.getItem('user') || '{}')
  userID:number = Number(this.user.userId);

  productList:any;

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts():void{
    this.service.getSellingProducts(this.user.userId).subscribe({
      next:(res)=>{
        console.log('Product List: get all products')
        console.log(res)
        this.productList = res;
      },
      error:(err) => {
        console.log(err)
      },
    })
  }

  delete(id:string):void{
    this.service.deleteSellingProduct(id,this.user.userId).subscribe({
      next:(res)=>{
        console.log(res);
        this.productList = this.modifyid(id, this.productList);
      },
      error:(err) => {
        console.log(err)
      },
    });
  }

  modifyid (delid:string, arr:IProduct[]):IProduct[]{
    //  delete a produdct and update id then return new products
    const index = arr.findIndex((p:any)=> p.id == delid)
    console.log('index of deleted item  =  ' + index)
    arr = arr.filter((p:any)=> p.id != delid)
      for (let i = index ; i < arr.length; i++) {
        const idLength = arr[i].id.length ;
        const lastIndex = arr[i].id.length - 1 ;
        const id = Number(arr[i].id)
        if (arr.length >= 8 && arr[i].id[lastIndex] == '1') {
          const increment = Math.pow( 10, idLength - 2)
          const idof = this.userID * increment;
          arr[i].id = (idof + 9).toString();
        } else {
          arr[i].id = (id - 1).toString();
        }
      }
    return arr;
  }
}
