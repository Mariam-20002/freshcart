"use client";
import Link from "next/link";
import { Heart, Trash2, ShoppingCart } from "lucide-react";
import type { WishlistRes } from "./interfaces/whishlist.interfaces";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { deleteWishlistItem } from "../Apis/wishList/action/deletWish.action";
import { addToCart } from "../Apis/cart/actions/addCart.action";
import type { ProductInterface } from "../interfaces/Product.interface";

interface CartItem {
  product: {
    _id: string;
  };
}

interface CartQueryData {
  numOfCartItems: number;

  data: {
    products: CartItem[];
  };
}
export default function WishlistPage() {
  const { data } = useQuery<WishlistRes>({
    queryKey: ["wishlist"],

    queryFn: async () => {
      const data = await fetch("/api/Wishlist");

      if (!data.ok) throw new Error("failed to fetch wishlist");

      return data.json();
    },
  });

  // delet wishlist
  const queryClient = useQueryClient();
  const { mutate: delMutate, isPending: delPending } = useMutation({
    mutationFn: deleteWishlistItem,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wishlist"],
      });
    },
  });
  if (delPending) {
  }

  const { data: cartData } = useQuery({
    queryKey: ["cart"],

    queryFn: async () => {
      const res = await fetch("/api/cart");

      if (!res.ok) throw new Error("failed to fetch cart");

      return res.json();
    },
  });
  const cartProductsIds: string[] =
    cartData?.data?.products?.map((item: CartItem) => item.product._id) ?? [];

  const { mutate: addCartMutate } = useMutation({
    mutationFn: addToCart,

    onMutate: async (productId: string) => {
      await queryClient.cancelQueries({
        queryKey: ["cart"],
      });

      const previousCart = queryClient.getQueryData(["cart"]);

      queryClient.setQueryData(["cart"], (old: CartQueryData) => {
        if (!old) return old;

        return {
          ...old,

          numOfCartItems: old.numOfCartItems + 1,

          data: {
            ...old.data,

            products: [
              ...old.data.products,

              {
                product: {
                  _id: productId,
                },
              },
            ],
          },
        };
      });

      return { previousCart };
    },

    onError: (_err, _productId, context) => {
      queryClient.setQueryData(["cart"], context?.previousCart);
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });

  function handleAddToCart(item: ProductInterface) {
    addCartMutate(item._id);
  }

  const products = data?.data || [];

  return (
    <div className="container max-w-[1536px] mx-auto px-4 xl:px-6 min-h-screen py-5">
      {products.length === 0 ? (
        /* Empty Wishlist */
        <main className="flex items-center justify-center pt-[120px]">
          <div className="text-center">
            <div className="w-[72px] h-[72px] mx-auto rounded-2xl bg-[#f1f1f1] flex items-center justify-center mb-6">
              <Heart size={34} strokeWidth={1.7} className="text-[#98a1b2]" />
            </div>

            <h2 className="text-[32px] font-bold text-[#001e2b] mb-3">
              Your wishlist is empty
            </h2>

            <p className="text-[#5c6c75] text-[18px] mb-8">
              Browse products and save your favorites here.
            </p>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-[#099309] text-white text-[18px] font-semibold px-14 py-4 rounded-2xl transition-all duration-300"
            >
              Browse Products
              <span className="text-[22px]">→</span>
            </Link>
          </div>
        </main>
      ) : (
        <>
          {/* top section */}
          <div className="mb-10 pt-6">
            {/* breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-[#667085] mb-6">
              <Link href="/" className="hover:text-[#16A34A] transition">
                Home
              </Link>

              <span>/</span>

              <span className="text-[#101828] font-medium">Wishlist</span>
            </div>

            {/* title */}
            <div className="flex items-center gap-4">
              {/* icon */}
              <div
                className="w-14 h-14 rounded-2xl
      bg-[#FEF2F2]
      flex items-center justify-center"
              >
                <Heart size={26} className="text-[#EF4444]" fill="#EF4444" />
              </div>

              {/* text */}
              <div>
                <h1 className="text-[34px] leading-none font-bold text-[#0F172A]">
                  My Wishlist
                </h1>

                <p className="text-[#667085] text-[16px] mt-3">
                  <span className="text-[#16A34A] font-semibold">
                    {products.length} items
                  </span>{" "}
                  saved
                </p>
              </div>
            </div>
          </div>
          {/*  Wishlist Table */}
          <div className="overflow-hidden rounded-xl border mt-10 bg-white shadow-sm">
            <Table>
              {/* table header */}
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              {/* table body */}
              <TableBody>
                {products.map((item) => (
                  <TableRow key={item._id}>
                    {/* product */}
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <Link
                          href={`/ProductDetails/${item._id}`}
                          className="relative w-20 h-20 rounded-md border overflow-hidden bg-[#F9FAFB] shrink-0"
                        >
                          <Image
                            src={item.imageCover}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </Link>

                        <div>
                          <Link href={`/ProductDetails/${item._id}`}>
                            <h3 className="font-medium leading-6 max-w-[640px] whitespace-normal hover:text-green-600 transition-colors duration-300 cursor-pointer">
                              {item.title}
                            </h3>
                          </Link>

                          <p className="text-sm text-muted-foreground">
                            {item.category.name}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* price */}
                    <TableCell className="font-semibold">
                      {item.priceAfterDiscount ?? item.price} EGP
                    </TableCell>

                    {/* status */}
                    <TableCell>
                      {cartProductsIds.includes(item._id) ? (
                        <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full flex items-center w-fit gap-2">
                          <ShoppingCart size={14} />
                          In Cart
                        </span>
                      ) : (
                        <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
                          In Stock
                        </span>
                      )}
                    </TableCell>

                    {/* actions */}
                    <TableCell>
                      <div className="flex items-center justify-end gap-3">
                        {cartProductsIds.includes(item._id) ? (
                          <Link
                            href="/cart"
                            className="flex items-center gap-2 bg-[#F3F4F6]
        hover:bg-[#E5E7EB]
        text-[#111827] px-4 py-2 rounded-lg transition"
                          >
                            ✓ View Cart
                          </Link>
                        ) : (
                          <button
                            onClick={() => handleAddToCart(item)}
                            className="flex items-center gap-2 bg-green-600
        hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                          >
                            <ShoppingCart size={18} />
                            Add To Cart
                          </button>
                        )}

                        <button
                          onClick={() => delMutate(item._id)}
                          className="w-10 h-10 rounded-[12px] border border-[#FFC9C9]
      bg-[#FFF2F2] text-[#FF2D2D]
      hover:bg-[#FF2D2D] hover:text-white
      hover:border-[#FF2D2D]
      flex items-center justify-center
      transition-all duration-200"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* footer */}
            <div className="p-6 border-t">
              <Link
                href="/products"
                className="text-green-600 font-medium hover:underline"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
