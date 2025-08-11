import { Component ,inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IUser } from '../../interfaces/IUser/iuser';
import { IProduct } from '../../interfaces/IProduct/iproduct';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.css'
})
export class ProductTableComponent {

  private readonly serviceU = inject(UserService)
  user!:IUser
  userID!:number;
  useridd!:string;

  successMessage!:string;
  productList!:IProduct[];


  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}')
    this.userID = Number(this.user.userId);
    this.useridd  = this.user.id;
    this.productList = this.user.sellingProducts;
  }

  delete(prodid:string , index:number):void{
    this.productList = this.deleteAndModifyId(prodid, this.productList,index);
    this.user.sellingProducts = this.productList
    this.serviceU.editUser(this.user,this.useridd).subscribe({
      next:()=>{
          localStorage.setItem('user', JSON.stringify(this.user));
        this.successMessage="product deleted successfully"
      },
      error:(err) => {
        console.log(err)
      },
    });
  }

  deleteAndModifyId (delid:string, arr:IProduct[] , index:number):IProduct[]{
    //  delete a produdct and update id then return new products
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
