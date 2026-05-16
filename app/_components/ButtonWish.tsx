"use client";

import { ReactNode, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { FaHeart } from "react-icons/fa";

import { addToWishlist } from "../Apis/wishList/action/addWish.action";
import { deleteWishlistItem } from "../Apis/wishList/action/deletWish.action";

import { ProductInterface } from "@/app/interfaces/Product.interface";
import {
  addToGuestWishlist,
  removeFromGuestWishlist,
} from "../Utilites/guestWishlist";

interface pageProps {
  children?: ReactNode;
  cls: string;
  id: string;
  product: ProductInterface;
  fullStyle?: boolean;
  isInitiallyWishlisted?: boolean;
}

export default function ButtonWish({
  children,
  cls,
  id,
  product,
  fullStyle = false,
  isInitiallyWishlisted = false,
}: pageProps) {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const [isWishlisted, setIsWishlisted] = useState(() => {
    if (typeof window === "undefined") {
      return isInitiallyWishlisted;
    }

    const guestWishlist = JSON.parse(
      localStorage.getItem("guestWishlist") || "[]",
    );

    const guestHasProduct = guestWishlist.some(
      (item: ProductInterface) => item._id === id,
    );

    return isInitiallyWishlisted || guestHasProduct;
  });

  // add wishlist
  const addMutation = useMutation({
    mutationFn: addToWishlist,

    onSuccess: () => {
      setIsWishlisted(true);

      toast("product add successfully", {
        position: "top-right",
      });

      queryClient.invalidateQueries({
        queryKey: ["wishlist"],
      });
    },

    onError: () => {
      toast("login first");
    },
  });

  // remove wishlist
  const removeMutation = useMutation({
    mutationFn: deleteWishlistItem,

    onSuccess: () => {
      setIsWishlisted(false);

      toast("product removed successfully", {
        position: "top-right",
      });

      queryClient.invalidateQueries({
        queryKey: ["wishlist"],
      });
    },
  });

  function handleWishlist() {
    // logged user
    if (session) {
      if (isWishlisted) {
        removeMutation.mutate(id);
      } else {
        addMutation.mutate(id);
      }

      return;
    }

    // guest user
    if (isWishlisted) {
      removeFromGuestWishlist(id);

      setIsWishlisted(false);

      toast("Removed from wishlist");
    } else {
      addToGuestWishlist(product);

      setIsWishlisted(true);

      toast("Added to wishlist");
    }

    queryClient.invalidateQueries({
      queryKey: ["wishlist"],
    });
  }

  return (
    <button
      onClick={handleWishlist}
      className={`${cls} ${
        fullStyle && isWishlisted ? "border-red-300 bg-red-50 text-red-500" : ""
      }`}
    >
      {fullStyle ? (
        isWishlisted ? (
          <>
            <FaHeart />
            In Wishlist
          </>
        ) : (
          children
        )
      ) : isWishlisted ? (
        <FaHeart size={16} className="text-red-500" />
      ) : (
        children
      )}
    </button>
  );
}
