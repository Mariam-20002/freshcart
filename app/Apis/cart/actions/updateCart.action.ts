"use server";

import { getTokenFn } from "@/app/Utilites/getTokenFun";

export async function updateToCart(productId: string, count: number) {
  // get user token
  const token = await getTokenFn();

  // check token
  if (!token) {
    throw new Error("unauthorized!");
  }

  // add product to cart
  const data = await fetch(
    `https://ecommerce.routemisr.com/api/v2/cart/${productId}`,
    {
      method: "PUT",
      body: JSON.stringify({ count }),
      headers: { token, "Content-type": "application/json" },
    },
  );

  // response
  const payload = await data.json();

  console.log(payload);

  return payload;
}
