import { IProduct } from "../IProduct/iproduct";

export interface ICart {
  userId: string;
  userName: string;
  totalPrice: number;
  myProducts: ICartProduct[];
  sellingProducts: IProduct[];

}


export interface ICartProduct {
  productId: string;
  quantity: number;
}
