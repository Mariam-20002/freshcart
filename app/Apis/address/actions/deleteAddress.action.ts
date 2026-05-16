"use server";

import { getTokenFn } from "@/app/Utilites/getTokenFun";

export async function deleteAddress(addressId: string) {
  // get token
  const token = await getTokenFn();

  // check token
  if (!token) {
    return null;
  }

  // delete address
  const res = await fetch(`${process.env.API}addresses/${addressId}`, {
    method: "DELETE",
    headers: {
      token,
    },
  });

  // response
  const payload = await res.json();

  return payload;
}
