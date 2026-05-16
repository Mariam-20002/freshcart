
import type { CartRes } from "@/app/cart/interfaces/cart.interfaces";
import { getTokenFn } from "@/app/Utilites/getTokenFun";

export async function getCart(): Promise<CartRes | null> {
  // get user token
  const token = await getTokenFn();

  // check token
  if (!token) {
    throw new Error("unauthorized!");
  }

  // add product to cart
  const data = await fetch(`${process.env.API}cart`, {
    headers: { token, "Content-type": "application/json" },
  });

  // response
  const payload = await data.json();

  console.log("cart", payload);

  return payload;
}
