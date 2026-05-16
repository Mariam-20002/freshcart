"use server";

import { getTokenFn } from "@/app/Utilites/getTokenFun";
import type { AddressFormInterface } from "../address.api";

export async function updateAddress(
  addressId: string,
  address: AddressFormInterface,
) {
  // get token
  const token = await getTokenFn();

  // check token
  if (!token) {
    throw new Error("unauthorized!");
  }

  // update address
  const res = await fetch(`${process.env.API}addresses/${addressId}`, {
    method: "PUT",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(address),
  });

  // response
  const payload = await res.json();

  return payload;
}
