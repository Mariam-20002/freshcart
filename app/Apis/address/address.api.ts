"use server";

import { getTokenFn } from "@/app/Utilites/getTokenFun";

export interface AddressInterface {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}

export interface AddressFormInterface {
  name: string;
  details: string;
  phone: string;
  city: string;
}

export interface AddressRes {
  results: number;
  data: AddressInterface[];
}

export async function getAddresses(): Promise<AddressRes | null> {
  // get token
  const token = await getTokenFn();

  // check token
  if (!token) {
    return null;
  }

  // fetch addresses
  const res = await fetch(`${process.env.API}addresses`, {
    headers: {
      token,
      "Content-Type": "application/json",
    },
  });

  // response
  const payload = await res.json();

  return payload;
}
