export interface IProduct {
  id: string;
  name: string;
  price: number;
  quantity:number;
  rating:number;
  description: string;
  coverImage: string;
  images: string[];
  category: string;
}

// id = userid prodID
// U or P   start with 1
// id = UP  if id = 19 ==> U0P


//  19    <==  1 * 10   +  1  <== start
//  109   <==  1 * 100  +  1  <== start
//  1009  <==  1 * 1000  + 1  <== start
//  10009 <==  1 * 10000 + 1  <== start
