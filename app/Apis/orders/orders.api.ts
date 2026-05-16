"use server";

import { getTokenFn } from "@/app/Utilites/getTokenFun";

export async function getUserOrders(userId: string) {
  const token = await getTokenFn();

  if (!token) {
    throw new Error("Unauthorized!");
  }

  const data = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
    {
      method: "GET",

      headers: {
        token,
      },

      cache: "no-store",
    },
  );

  if (!data.ok) {
    throw new Error("Failed to fetch orders!");
  }

  const res = await data.json();

  return res;
}
