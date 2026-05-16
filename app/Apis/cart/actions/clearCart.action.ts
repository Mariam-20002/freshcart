"use server";

import { getTokenFn } from "@/app/Utilites/getTokenFun";

export async function clearCart() {
  // get user token
  const token = await getTokenFn();

  // check token
  if (!token) {
    return null;
  }

  // clear full cart
  const data = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
    method: "DELETE",
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
