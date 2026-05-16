"use client";

import { ReactNode, useState } from "react";
import { addToCart } from "../Apis/cart/actions/addCart.action";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Loader2, Check } from "lucide-react";
import { FaPlus } from "react-icons/fa";
import type { ProductInterface } from "../interfaces/Product.interface";
import { addToGuestCart } from "../Utilites/guestCart";

interface pageProps {
  children?: ReactNode;
  cls: string;
  id: string;
  product: ProductInterface;
}

export default function ButtonCom({ children, cls, id, product }: pageProps) {
  const queryClient = useQueryClient();

  const [success, setSuccess] = useState(false);
  const { data: session } = useSession();
  const { mutate, isPending } = useMutation({
    mutationFn: addToCart,

    onSuccess: () => {
      toast("product add succsessfully", {
        position: "top-right",
      });

      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });

      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
      }, 1200);
    },

    onError: () => {
      toast("login first");
    },
  });

  function handleAddToCart() {
    // logged user
    if (session) {
      mutate(id);

      return;
    }

    // guest user
    addToGuestCart(product);

    toast("product add succsessfully", {
      position: "top-right",
    });

    queryClient.invalidateQueries({
      queryKey: ["guestCart"],
    });

    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
    }, 1200);
  }
  return (
    <button onClick={handleAddToCart} disabled={isPending} className={cls}>
      {isPending ? (
        <Loader2 size={16} className="animate-spin" />
      ) : success ? (
        <Check size={16} />
      ) : children ? (
        children
      ) : (
        <FaPlus size={14} />
      )}
    </button>
  );
}
