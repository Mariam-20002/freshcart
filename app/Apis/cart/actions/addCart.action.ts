"use server";

import { getTokenFn } from "@/app/Utilites/getTokenFun";

export async function addToCart(productId: string) {
  // get user token
  const token = await getTokenFn();

  // check token
  if (!token) {
    return null;
  }

  // add product to cart
  const data = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
    method: "POST",
    body: JSON.stringify({ productId }),
    headers: { token, "Content-type": "application/json" },
  });

  // response
  const payload = await data.json();

  console.log(payload);

  return payload;
}
