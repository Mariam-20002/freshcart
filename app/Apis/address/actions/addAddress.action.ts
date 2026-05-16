"use server";

import { getTokenFn } from "@/app/Utilites/getTokenFun";
import type { AddressFormInterface } from "../address.api";

export async function addAddress(address: AddressFormInterface) {
  // get token
  const token = await getTokenFn();

  // check token
  if (!token) {
    return null;
  }

  // add address
  const res = await fetch(`${process.env.API}addresses`, {
    method: "POST",
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
