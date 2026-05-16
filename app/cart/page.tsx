"use client";

import { useSession } from "next-auth/react";

import GuestCart from "../_components/GuestCart";
import Cart from "./Cart";

export default function CartPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  if (!session) {
    return <GuestCart />;
  }

  return <Cart />;
}
