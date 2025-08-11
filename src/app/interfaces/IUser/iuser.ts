import { IProduct } from "../IProduct/iproduct";
// userid start with 1 ==> + 1
export interface IUser {
  userId: string;
  id: string;
  userName: string;
  cart: ICart;
  sellingProducts: IProduct[];
}

export interface ICart {
  totalPrice: number;
  myProducts: ICartProduct[];
}

export interface ICartProduct {
  productId: string;
  name?: string;
  image?: string;
  quantity: number;
  price:number;
}

