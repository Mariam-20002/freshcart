"use server";
import { getTokenFn } from "@/app/Utilites/getTokenFun";

interface shippingAddressInterface {
  details: string;
  phone: string;
  city: string;
}

export async function onlinePayment(
  cartId: string,
  shippingAddress: shippingAddressInterface,
) {
  const token = await getTokenFn();

  if (!token) {
    return null;
  }

  const data = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}`,
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
  if (!data.ok) return null;

  const res = await data.json();
  return res;
}
