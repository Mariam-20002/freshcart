"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";

import { PackageOpen, Truck, Lock, ShieldCheck, Tag } from "lucide-react";

import { FaTrash } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

import { PiShoppingCart } from "react-icons/pi";

import {
  clearGuestCart,
  getGuestCart,
  removeFromGuestCart,
  updateGuestCart,
} from "../Utilites/guestCart";

export default function GuestCart() {
  const [cartItems, setCartItems] = useState<any[]>([]);

  const [loadingItem, setLoadingItem] = useState<string | null>(null);

  const [showClearModal, setShowClearModal] = useState(false);

  useEffect(() => {
    setCartItems(getGuestCart());
  }, []);

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

  function handleDelete(productId: string) {
    removeFromGuestCart(productId);

    setCartItems(getGuestCart());
  }

  function handleIncrease(productId: string, count: number) {
    setLoadingItem(productId);

    setTimeout(() => {
      updateGuestCart(productId, count + 1);

      setCartItems(getGuestCart());

      setLoadingItem(null);
    }, 300);
  }

  function handleDecrease(productId: string, count: number) {
    if (count <= 1) return;

    setLoadingItem(productId);

    setTimeout(() => {
      updateGuestCart(productId, count - 1);

      setCartItems(getGuestCart());

      setLoadingItem(null);
    }, 300);
  }

  function handleClear() {
    clearGuestCart();

    setCartItems([]);

    setShowClearModal(false);
  }

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.count,
    0,
  );

  if (!cartItems.length) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-20">
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
    );
  }

  return (
    <div className="container max-w-[1536px] mx-auto px-4 xl:px-6 min-h-screen py-10">
      {/* breadcrumb */}
      <div className="mb-8">
        <div className="flex items-center gap-3 text-[15px] text-[#9CA3AF] mb-5">
          <Link href="/" className="hover:text-[#16A34A] transition">
            Home
          </Link>

          <span>/</span>

          <span className="text-[#111827] font-medium">Shopping Cart</span>
        </div>

        {/* title */}
        <div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#16A34A] flex items-center justify-center shrink-0">
              <FaCartShopping size={35} className="text-white" />
            </div>

            <h1 className="text-[28px] leading-none font-bold text-[#0F172A]">
              Shopping Cart
            </h1>
          </div>

          <p className="text-[15px] text-[#6B7280] mt-4">
            You have{" "}
            <span className="text-[#16A34A] font-semibold">
              {cartItems.length} items
            </span>{" "}
            in your cart
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 items-start">
        {/* cart items */}
        <div className="space-y-4 pr-2">
          {cartItems.map((item) => (
            <div
              key={item.product._id}
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

              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-8">
                {/* LEFT */}
                <div className="flex items-center gap-4 flex-1">
                  <Link
                    href={`/ProductDetails/${item.product._id}`}
                    className="flex flex-col items-center shrink-0"
                  >
                    <div className="relative w-28 h-28 rounded-xl border border-[#F3F4F6] bg-[#F9FAFB] overflow-hidden">
                      <Image
                        src={item.product.imageCover}
                        alt={item.product.title}
                        fill
                        className="object-cover p-2"
                      />
                    </div>

                    <span className="mt-2 bg-[#16A34A] text-white text-[10px] px-3 py-[2px] rounded-full">
                      ✓ In Stock
                    </span>
                  </Link>

                  {/* info */}
                  <div>
                    <Link href={`/ProductDetails/${item.product._id}`}>
                      <h2 className="text-[17px] font-semibold leading-[1.6] text-[#111827] hover:text-[#16A34A] transition-colors duration-300">
                        {item.product.title}
                      </h2>
                    </Link>

                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <span className="bg-[#ECFDF3] text-[#16A34A] text-[11px] px-2.5 py-1 rounded-full">
                        {item.product.category?.name}
                      </span>

                      <span className="text-[#9CA3AF] text-xs">
                        SKU: {item.product.id?.slice(-6).toUpperCase()}
                      </span>
                    </div>

                    {/* price */}
                    <div className="mt-3 flex items-end gap-2">
                      <span className="text-[20px] font-bold text-[#16A34A]">
                        {item.product.price} EGP
                      </span>

                      <span className="text-[#9CA3AF] text-sm">per unit</span>
                    </div>

                    {/* quantity */}
                    <div className="mt-3">
                      <div className="flex items-center border border-[#E5E7EB] rounded-xl overflow-hidden h-11 w-fit">
                        <button
                          onClick={() =>
                            handleDecrease(item.product._id, item.count)
                          }
                          className="w-11 h-11 flex items-center justify-center text-lg text-gray-500 hover:bg-gray-100 transition"
                        >
                          -
                        </button>

                        <span className="w-11 text-center font-semibold">
                          {item.count}
                        </span>

                        <button
                          onClick={() =>
                            handleIncrease(item.product._id, item.count)
                          }
                          className="w-11 h-11 flex items-center justify-center bg-[#16A34A] text-white hover:bg-green-700 transition"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex flex-col justify-end items-end self-stretch">
                  <div className="flex items-end gap-4 mt-auto">
                    {/* total */}
                    <div className="text-right">
                      <p className="text-[#9CA3AF] text-xs mb-1">Total</p>

                      <h3 className="text-[20px] font-bold text-[#111827]">
                        {item.product.price * item.count}

                        <span className="text-sm text-[#9CA3AF] ml-1">EGP</span>
                      </h3>
                    </div>

                    {/* delete */}
                    <button
                      onClick={() => handleDelete(item.product._id)}
                      className="w-10 h-10 rounded-[12px] border border-[#FFC9C9] bg-[#FFF2F2] text-[#FF2D2D]
                      hover:bg-[#FF2D2D] hover:text-white hover:border-[#FF2D2D]
                      flex items-center justify-center transition-all duration-200"
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* footer */}
          <div className="flex items-center justify-between mt-3">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-[#16A34A] text-sm font-medium"
            >
              ← Continue Shopping
            </Link>

            <button
              onClick={() => setShowClearModal(true)}
              className="inline-flex items-center gap-2 text-[#FF2D2D] text-sm font-medium hover:text-red-700 transition"
            >
              <FaTrash size={14} />
              Clear all items
            </button>
          </div>
        </div>

        {/* modal */}
        {showClearModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[3px]">
            <div className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl border border-gray-100">
              <div className="w-24 h-24 mx-auto rounded-full bg-red-50 flex items-center justify-center mb-6">
                <PiShoppingCart size={50} className="text-red-500" />
              </div>

              <h2 className="text-3xl font-bold text-gray-900 text-center">
                Clear Your Cart?
              </h2>

              <p className="text-gray-500 mt-4 text-center leading-7">
                All items will be removed from your cart.
              </p>

              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={() => setShowClearModal(false)}
                  className="px-6 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold"
                >
                  Keep Shopping
                </button>

                <button
                  onClick={handleClear}
                  className="px-6 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-semibold"
                >
                  Yes, Clear All
                </button>
              </div>
            </div>
          </div>
        )}

        {/* summary */}
        <div className="sticky top-24 w-full max-w-[500px] rounded-[20px] overflow-hidden border border-[#E5E7EB] bg-white shadow-sm">
          {/* header */}
          <div className="bg-gradient-to-r from-[#16A34A] to-[#15803D] px-6 py-5 text-white">
            <h2 className="text-[18px] font-semibold">Order Summary</h2>
          </div>

          <div className="p-5">
            {/* prices */}
            <div className="mt-5 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[#6B7280]">Subtotal</span>

                <span className="font-semibold">{totalPrice} EGP</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#6B7280]">Shipping</span>

                <span className="text-[#16A34A] ">Calculated at checkout</span>
              </div>

              <div className="border-t border-[#E5E7EB] pt-3 flex items-end justify-between">
                <span className="font-semibold">Total</span>

                <div className="text-right">
                  <span className="text-[26px] font-bold">{totalPrice}</span>

                  <span className="text-[#9CA3AF] text-[12px] ml-1">EGP</span>
                </div>
              </div>
            </div>

            {/* checkout */}
            <Link
              href="/login"
              className="mt-6 w-full h-14 rounded-xl bg-gradient-to-r from-[#16A34A] to-[#15803D]
                  text-white text-[18px] font-semibold shadow-md flex items-center justify-center gap-2 hover:opacity-90 transition"
            >
              <Lock size={18} />

              <span>Login To Checkout</span>
            </Link>

            {/* signup */}
            <p className="mt-5 text-center text-[13px] text-[#98A2B3]">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-[#16A34A] font-semibold hover:underline transition"
              >
                Sign up
              </Link>
            </p>

            {/* divider */}
            <div className="border-t border-[#EAECF0] my-5"></div>

            {/* footer */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#667085] text-[13px]">
                <ShieldCheck size={15} className="text-[#98A2B3] shrink-0" />

                <span>Your cart items will be saved</span>
              </div>

              <div className="flex items-center gap-2 text-[#667085] text-[13px]">
                <Truck size={15} className="text-[#98A2B3] shrink-0" />

                <span>Track your orders easily</span>
              </div>

              <div className="flex items-center gap-2 text-[#667085] text-[13px]">
                <Tag size={15} className="text-[#98A2B3] shrink-0" />

                <span>Access exclusive member deals</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
