"use client";

import { useSession } from "next-auth/react";

import GuestWishlistPage from "../_components/GuestWishlistPage";
import Wishlist from "./Wishlist";

export default function WishlistPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  if (!session) {
    return <GuestWishlistPage />;
  }

  return <Wishlist />;
}
