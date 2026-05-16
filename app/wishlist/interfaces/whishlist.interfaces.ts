import type { ProductInterface } from "@/app/interfaces/Product.interface";

export interface WishlistRes {
  status: string;
  count: number;
  numOfCartItems: number;
  data: ProductInterface[];
}
