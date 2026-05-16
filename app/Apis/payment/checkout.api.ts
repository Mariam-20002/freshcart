"use server";

import { getTokenFn } from "@/app/Utilites/getTokenFun";

interface shippingAddressInterface {
  details: string;
  phone: string;
  city: string;
}

export async function createCashOrder(
  cartId: string,
  shippingAddress: shippingAddressInterface,
) {
  const token = await getTokenFn();

  if (!token) {
    throw new Error("unauthorized!");
  }

  const data = await fetch(
    `https://ecommerce.routemisr.com/api/v2/orders/${cartId}`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        token,
      },

      body: JSON.stringify({
        shippingAddress,
      }),
    },
  );

  if (!data.ok) {
    throw new Error("failed to create order!");
  }

  const res = await data.json();

  return res;
}
