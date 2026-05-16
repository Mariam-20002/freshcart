"use server";

import { getTokenFn } from "@/app/Utilites/getTokenFun";

export async function deleteWishlistItem(productId: string) {
  const token = await getTokenFn();

  if (!token) {
    return null;
  }

  const response = await fetch(`${process.env.API}wishlist/${productId}`, {
    method: "DELETE",
    headers: {
      token,
    },
  });

  const payload = await response.json();

  console.log(payload);

  return payload;
}
