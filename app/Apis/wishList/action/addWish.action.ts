"use server";

import { getTokenFn } from "@/app/Utilites/getTokenFun";

export async function addToWishlist(productId: string) {
  // get user token
  const token = await getTokenFn();

  // check token
  if (!token) {
    return null;
  }

  // add product to wishlist
  const data = await fetch(`${process.env.API}wishlist`, {
    method: "POST",
    body: JSON.stringify({ productId }),
    headers: {
      token,
      "Content-type": "application/json",
    },
  });

  // response
  const payload = await data.json();

  console.log(payload);

  return payload;
}
