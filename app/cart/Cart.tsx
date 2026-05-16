"use client";
import { PackageOpen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { FaCartShopping } from "react-icons/fa6";
import type { CartRes } from "./interfaces/cart.interfaces";
import { Tag, Lock, ShieldCheck, Truck } from "lucide-react";
import { FaTrash } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { delteItemCart } from "../Apis/cart/actions/deletCart.action";
import { updateToCart } from "../Apis/cart/actions/updateCart.action";
import { useState } from "react";
import { clearCart } from "../Apis/cart/actions/clearCart.action";
import { PiShoppingCart } from "react-icons/pi";
import { useEffect } from "react";
export default function Cart() {
  const [loadingItem, setLoadingItem] = useState<string | null>(null);
  const [showClearModal, setShowClearModal] = useState(false);
  const { data } = useQuery<CartRes>({
    queryKey: ["cart"],

    queryFn: async () => {
      const data = await fetch("/api/Cart");

      if (!data.ok) throw new Error("failed to fetch cart");

      return data.json();
    },
  });

  // delete cart
  const queryClient = useQueryClient();
  const { mutate: delMutate, isPending: delPending } = useMutation({
    mutationFn: delteItemCart,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });

  if (delPending) {
  }

  const { mutate: clearMutate } = useMutation({
    mutationFn: clearCart,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });

  // update cart

  const { mutate: updateMutate } = useMutation({
    mutationFn: ({ productId, count }: { productId: string; count: number }) =>
      updateToCart(productId, count),

    onMutate: ({ productId }) => {
      setLoadingItem(productId);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },

    onSettled: () => {
      setLoadingItem(null);
    },
  });

  function handleMutateIncrease(productId: string, count: number) {
    updateMutate({
      productId,
      count: count + 1,
    });
  }

  function handleMutateDecrease(productId: string, count: number) {
    if (count <= 1) return;

    updateMutate({
      productId,
      count: count - 1,
    });
  }

  useEffect(() => {
    if (showClearModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showClearModal]);

  return (
    <div className="container max-w-[1536px] mx-auto px-4 xl:px-6 min-h-screen py-10">
      {/* breadcrumb */}

      {!data?.data?.products?.length ? (
        /* Empty Cart Section */
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center mb-6">
            <PackageOpen size={60} className="text-gray-300" />
          </div>

          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Your cart is empty
          </h2>

          <p className="text-gray-500 text-lg mb-8 max-w-md">
            Looks like you haven’t added anything to your cart yet.
          </p>

          <Link
            href="/"
            className="bg-green-600 hover:bg-[#15803D] transition text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg"
          >
            Start Shopping →
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-8">
            {/* breadcrumb */}
            <div className="flex items-center gap-3 text-[15px] text-[#9CA3AF] mb-5">
              <Link href="/" className="hover:text-[#16A34A] transition">
                Home
              </Link>

              <span>/</span>

              <span className="text-[#111827] font-medium">Shopping Cart</span>
            </div>

            {/* title section */}
            <div>
              {/* icon + title */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#16A34A] flex items-center justify-center shrink-0">
                  <FaCartShopping size={35} className="text-white" />
                </div>

                <h1 className="text-[28px] leading-none font-bold text-[#0F172A]">
                  Shopping Cart
                </h1>
              </div>

              {/* text */}
              <p className="text-[15px] text-[#6B7280] mt-4">
                You have{" "}
                <span className="text-[#16A34A] font-semibold">
                  {data?.numOfCartItems} items
                </span>{" "}
                in your cart
              </p>
            </div>
          </div>
          {/*  Cart */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 items-start">
            {/* cart items */}
            <div className="space-y-4 pr-2">
              {data?.data?.products.map((item) => (
                <div
                  key={item._id}
                  className={`relative rounded-2xl border border-[#EAECF0] bg-white px-6 py-5 shadow-sm transition-all duration-300 ${
                    loadingItem === item.product._id
                      ? "opacity-70 scale-[0.99]"
                      : ""
                  }`}
                >
                  {loadingItem === item.product._id && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                      <div className="bg-white shadow-xl rounded-full px-6 py-3 flex items-center gap-3 border border-gray-100">
                        <div className="w-5 h-5 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />

                        <span className="text-gray-600 font-medium">
                          Updating...
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center justify-between gap-8">
                    {/* LEFT SIDE */}
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      {/* IMAGE + STOCK */}
                      <Link
                        href={`/ProductDetails/${item.product._id}`}
                        className="flex flex-col items-center shrink-0 cursor-pointer"
                      >
                        <div className="relative w-28 h-28 rounded-xl border border-[#F3F4F6] bg-[#F9FAFB] flex items-center justify-center overflow-hidden">
                          <Image
                            src={item.product.imageCover}
                            alt={item.product.title}
                            fill
                            className="object-cover p-2"
                          />
                        </div>

                        <span className="mt-2 bg-[#16A34A] text-white text-[10px] px-3 py-[2px] rounded-full whitespace-nowrap">
                          ✓ In Stock
                        </span>
                      </Link>

                      {/* INFO */}
                      <div className="flex flex-col justify-center min-w-0">
                        {/* title */}
                        <Link
                          href={`/ProductDetails/${item.product._id}`}
                          className="block flex-1 min-w-0"
                        >
                          <h2 className="text-[17px] font-semibold leading-[1.6] text-[#111827] hover:text-[#16A34A] transition-colors duration-300">
                            {item.product.title}
                          </h2>
                        </Link>
                        {/* category + sku */}
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          <span className="bg-[#ECFDF3] text-[#16A34A] text-[11px] px-2.5 py-1 rounded-full">
                            {item.product.category.name}
                          </span>

                          <span className="text-[#9CA3AF] text-xs">
                            SKU: {item.product.id.slice(-6).toUpperCase()}
                          </span>
                        </div>

                        {/* price */}
                        <div className="mt-3 flex items-end gap-2">
                          <span className="text-[20px] font-bold text-[#16A34A] leading-none">
                            {item.price} EGP
                          </span>

                          <span className="text-[#9CA3AF] text-sm">
                            per unit
                          </span>
                        </div>

                        {/* quantity */}
                        <div className="mt-3">
                          <div className="flex items-center border border-[#E5E7EB] rounded-xl overflow-hidden h-11 w-fit">
                            <button
                              onClick={() =>
                                handleMutateDecrease(
                                  item.product._id,
                                  item.count,
                                )
                              }
                              className="w-11 h-11 flex items-center justify-center text-lg text-gray-500 hover:bg-gray-100 transition cursor-pointer"
                            >
                              -
                            </button>

                            <span className="w-11 text-center font-semibold text-base">
                              {item.count}
                            </span>

                            <button
                              onClick={() =>
                                handleMutateIncrease(
                                  item.product._id,
                                  item.count,
                                )
                              }
                              className="w-11 h-11 flex items-center justify-center bg-[#16A34A] text-white hover:bg-green-700 transition cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="flex flex-col justify-end items-end self-stretch">
                      <div className="flex items-end gap-4 mt-auto">
                        {/* total */}
                        <div className="text-right">
                          <p className="text-[#9CA3AF] text-xs mb-1">Total</p>

                          <h3 className="text-[20px] font-bold text-[#111827] leading-none">
                            {item.price * item.count}

                            <span className="text-sm text-[#9CA3AF] ml-1">
                              EGP
                            </span>
                          </h3>
                        </div>

                        {/* delete */}

                        <button
                          onClick={() => delMutate(item.product._id)}
                          className="w-10 h-10 rounded-[12px] border border-[#FFC9C9] bg-[#FFF2F2] text-[#FF2D2D] cursor-pointer

                          hover:bg-[#FF2D2D] hover:text-white hover:border-[#FF2D2D] flex items-center justify-center transition-all duration-200 "
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex items-center justify-between mt-3">
                {/* continue shopping */}
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-[#16A34A] text-sm font-medium"
                >
                  ← Continue Shopping
                </Link>

                {/* clear cart */}
                <button
                  onClick={() => setShowClearModal(true)}
                  className="inline-flex items-center gap-2 text-[#FF2D2D] text-sm font-medium hover:text-red-700 transition cursor-pointer"
                >
                  <FaTrash size={14} />
                  Clear all items
                </button>
              </div>
            </div>

            {showClearModal && (
              <div
                className="
      fixed inset-0 z-50
      flex items-center justify-center
      bg-black/50 backdrop-blur-[3px]
      animate-in fade-in duration-300
    "
              >
                <div className="relative   w-full max-w-md rounded-3xl   bg-white  p-8 shadow-2xl  border border-gray-100 animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 ">
                  {/* icon */}
                  <div className="w-24 h-24 mx-auto rounded-full bg-red-50 flex items-center justify-center mb-6">
                    <PiShoppingCart size={50} className="text-red-500" />
                  </div>

                  {/* title */}
                  <h2 className="text-3xl font-bold text-gray-900 text-center">
                    Clear Your Cart?
                  </h2>

                  {/* desc */}
                  <p className="text-gray-500 mt-4 text-center leading-7">
                    All items will be removed from your cart. This action cannot
                    be undone.
                  </p>

                  {/* buttons */}
                  <div className="flex items-center justify-center gap-4 mt-8">
                    <button
                      onClick={() => setShowClearModal(false)}
                      className=" px-6 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition-all duration-200 cursor-pointer "
                    >
                      Keep Shopping
                    </button>

                    <button
                      onClick={() => {
                        clearMutate();
                        setShowClearModal(false);
                      }}
                      className=" px-6 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-semibold shadow-lg shadow-red-200 transition-all duration-200 cursor-pointer"
                    >
                      Yes, Clear All
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* order summary */}
            <div className="sticky top-24 w-full max-w-[500px] rounded-[20px] overflow-hidden border border-[#E5E7EB] bg-white shadow-sm">
              {/* header */}
              <div className="bg-gradient-to-r from-[#16A34A] to-[#15803D] px-6 py-5 text-white">
                <h2 className="text-[18px] font-semibold leading-none">
                  Order Summary
                </h2>

                <p className="text-green-100 text-sm mt-3">
                  {data?.numOfCartItems} items in your cart
                </p>
              </div>

              <div className="p-5">
                {/* free shipping */}
                <div className="bg-[#F3FAF5] rounded-[18px] px-4 py-4 flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-[#DDF6E5] flex items-center justify-center text-2xl shrink-0">
                    <Truck size={24} className="text-[#16A34A]" />
                  </div>

                  <div>
                    <h3 className="text-[18px] font-semibold text-[#15803D] leading-none">
                      Free Shipping!
                    </h3>

                    <p className="text-[#16A34A] text-sm mt-2">
                      You qualify for free delivery
                    </p>
                  </div>
                </div>

                {/* prices */}
                <div className="mt-5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[#6B7280] text-[15px]">Subtotal</span>

                    <span className="text-[15px] font-semibold text-[#111827]">
                      {data?.data?.totalCartPrice} EGP
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#6B7280] text-[16px]">Shipping</span>

                    <span className="text-[#16A34A] text-[15px] font-semibold">
                      FREE
                    </span>
                  </div>

                  {/* total */}
                  <div className="border-t border-[#E5E7EB] pt-3 flex items-end justify-between">
                    <span className="text-[16px] font-semibold text-[#111827]">
                      Total
                    </span>

                    <div className="text-right leading-none">
                      <span className="text-[26px] font-bold tracking-tight text-[#0F172A]">
                        {data?.data?.totalCartPrice}
                      </span>

                      <span className="text-[#9CA3AF] text-[12px] ml-1 font-medium">
                        EGP
                      </span>
                    </div>
                  </div>
                </div>

                {/* promo */}
                <div className="mt-6">
                  <button
                    className="w-full h-14 rounded-[18px] border border-dashed border-[#D1D5DB] bg-white flex items-center justify-center gap-3 text-[#6B7280] 
                hover:border-[#16A34A] hover:text-[#16A34A] cursor-pointer transition"
                  >
                    <span className="text-[16px]">
                      <Tag size={18} />
                    </span>

                    <span className="text-[15px] font-medium">
                      Apply Promo Code
                    </span>
                  </button>
                </div>

                {/* checkout */}
                <Link
                   href={`/Checkout/${data?.cartId}`}
                  className="mt-6 w-full h-14 rounded-2xl bg-gradient-to-r from-[#16A34A] to-[#15803D]
                   transition text-white text-[18px] font-semibold shadow-md cursor-pointer
                  flex items-center justify-center gap-2 hover:opacity-95"
                >
                  <Lock size={18} />
                  <span>Secure Checkout</span>
                </Link>

                {/* footer */}
                <div className="mt-6 flex items-center justify-center gap-8 text-[#6B7280] text-sm">
                  <span className="flex items-center gap-2">
                    <ShieldCheck size={16} />
                    Secure Payment
                  </span>

                  <span className="flex items-center gap-2">
                    <Truck size={16} />
                    Fast Delivery
                  </span>
                </div>

                {/* continue */}
                <div className="mt-6 text-center">
                  <Link
                    href="/products"
                    className="text-[#16A34A] text-[15px] font-medium "
                  >
                    ← Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
