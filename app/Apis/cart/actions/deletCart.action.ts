"use server";

import { getTokenFn } from "@/app/Utilites/getTokenFun";

export async function delteItemCart(productId: string) {
  // get user token
  const token = await getTokenFn();

  // check token
  if (!token) {
    return null;
  }

  //delet product to cart
  const data = await fetch(
    `https://ecommerce.routemisr.com/api/v2/cart/${productId}`,
    {
      method: "DELETE",
      headers: { token, "Content-type": "application/json" },
    },
  );

  // response
  const payload = await data.json();

  console.log(payload);

  return payload;
}
