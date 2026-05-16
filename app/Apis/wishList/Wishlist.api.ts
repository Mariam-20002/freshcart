"use server";

import { getTokenFn } from "@/app/Utilites/getTokenFun";
import type { WishlistRes } from "@/app/wishlist/interfaces/whishlist.interfaces";

export async function getWishlist(): Promise<WishlistRes | null> {
  // get user token
  const token = await getTokenFn();

  // check token
  if (!token) {
    throw new Error("unauthorized!");
  }

  // add product to wishlist
  const data = await fetch(`${process.env.API}wishlist`, {
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
