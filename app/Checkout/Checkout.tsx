"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Lock,
  ShieldCheck,
  Truck,
  MapPin,
  Phone,
  Building2,
  ClipboardList,
  CreditCard,
  Check,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import type { CartRes } from "../cart/interfaces/cart.interfaces";

import { getAddresses } from "@/app/Apis/address/address.api";
import { useState } from "react";
import type { AddressInterface } from "@/app/Apis/address/address.api";
import { createCashOrder } from "../Apis/payment/checkout.api";
import { onlinePayment } from "../Apis/payment/onlinePayment.api";
import { useQueryClient } from "@tanstack/react-query";
export default function Checkout({ cartId }: { cartId: string }) {
  const { data } = useQuery<CartRes>({
    queryKey: ["cart"],

    queryFn: async () => {
      const res = await fetch("/api/Cart");

      if (!res.ok) throw new Error("failed to fetch cart");

      return res.json();
    },
  });

  const { data: addressesData } = useQuery({
    queryKey: ["addresses"],
    queryFn: getAddresses,
  });

  const addresses = addressesData?.data || [];

  const [selectedAddress, setSelectedAddress] =
    useState<AddressInterface | null>(null);
  const [isManualAddress, setIsManualAddress] = useState(false);

  interface FormData {
    city: string;
    details: string;
    phone: string;
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      city: "",
      details: "",
      phone: "",
    },
  });
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const router = useRouter();
  const queryClient = useQueryClient();
  const onSubmit = async (data: FormData) => {
    console.log(data);

    if (paymentMethod === "online") {
      const res = await onlinePayment(cartId, data);
      if (res.status === "success") {
        window.location.href = res.session.url;
      }
    } else {
      const res = await createCashOrder(cartId, data);

      await queryClient.invalidateQueries({
        queryKey: ["cart"],
      });

      router.push("/allorders");
    }
  };

  return (
    <div className="bg-[#F9FAFB] min-h-screen py-10">
      <div className="container max-w-[1536px] mx-auto px-4 xl:px-6">
        {/* breadcrumb */}
        <div className="flex items-center gap-3 text-[15px] text-[#9CA3AF] mb-5">
          <Link href="/" className="hover:text-[#16A34A] transition">
            Home
          </Link>

          <span>/</span>

          <Link href="/cart" className="hover:text-[#16A34A] transition">
            Cart
          </Link>

          <span>/</span>

          <span className="text-[#111827] font-medium">Checkout</span>
        </div>

        {/* header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#16A34A] flex items-center justify-center shrink-0">
                <ClipboardList size={24} className="text-white" />
              </div>

              <div>
                <h1 className="text-[28px] font-bold text-[#0F172A]">
                  Complete Your Order
                </h1>

                <p className="text-[15px] text-[#6B7280] mt-2">
                  Review your items and complete your purchase
                </p>
              </div>
            </div>
          </div>

          <Link href="/cart" className="text-[#16A34A] text-[15px] font-medium">
            ← Back to Cart
          </Link>
        </div>

        {/* layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 items-start">
          {/* LEFT SIDE */}
          <div className="space-y-4 pr-2">
            {/* shipping address */}
            <div className="rounded-2xl border border-[#E5E7EB] bg-white shadow-sm overflow-hidden">
              {/* header */}
              <div className="bg-[#16A34A] px-6 py-5 text-white">
                <div className="flex items-center gap-3">
                  <Building2 size={20} />

                  <div>
                    <h2 className="text-[20px] font-semibold">
                      Shipping Address
                    </h2>

                    <p className="text-green-100 text-sm mt-1">
                      Where should we deliver your order?
                    </p>
                  </div>
                </div>
              </div>

              {/* body */}
              <div className="p-6">
                {/* info */}
                {/* saved addresses */}
                {addresses.length > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin size={18} className="text-[#16A34A]" />

                      <h3 className="text-[22px] font-bold text-[#111827]">
                        Saved Addresses
                      </h3>
                    </div>

                    <p className="text-gray-500 text-sm mb-5">
                      Select a saved address or enter a new one below
                    </p>

                    <div className="space-y-4">
                      {addresses.map((address) => (
                        <button
                          key={address._id}
                          type="button"
                          onClick={() => {
                            setSelectedAddress(address);

                            setIsManualAddress(false);

                            setValue("city", address.city);
                            setValue("details", address.details);
                            setValue("phone", address.phone);
                          }}
                          className={` w-full text-left rounded-2xl border p-5 transition-all duration-200${selectedAddress?._id === address._id ? "border-[#22C55E] bg-[#F0FDF4]" : "border-[#D1D5DB] bg-white hover:border-[#22C55E] hover:bg-[#F0FDF4]"}`}
                        >
                          <div className="flex items-start gap-4">
                            {/* icon */}
                            <div
                              className={`  w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${selectedAddress?._id === address._id ? "bg-[#22C55E]" : "bg-[#F3F4F6]"}`}
                            >
                              {selectedAddress?._id === address._id ? (
                                <Check
                                  size={20}
                                  className="text-white"
                                  strokeWidth={3}
                                />
                              ) : (
                                <MapPin
                                  size={20}
                                  className="text-[#6B7280]"
                                  fill="currentColor"
                                />
                              )}
                            </div>

                            {/* content */}
                            <div className="flex-1">
                              <h3 className="text-[18px] font-bold text-[#111827]">
                                {address.name}
                              </h3>

                              <p className="text-[#4B5563] mt-1 text-[15px]">
                                {address.details}
                              </p>

                              <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-[#6B7280]">
                                <span className="flex items-center gap-2">
                                  <Phone size={15} />
                                  {address.phone}
                                </span>

                                <span className="flex items-center gap-2">
                                  <Building2 size={15} />
                                  {address.city}
                                </span>
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}

                      {/* use different address */}
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedAddress(null);

                          setIsManualAddress(true);

                          setValue("city", "");
                          setValue("details", "");
                          setValue("phone", "");
                        }}
                        className={` w-full text-left rounded-2xl border-2 border-dashed p-5 transition ${isManualAddress ? "border-[#22C55E] bg-[#F0FDF4]" : "border-[#D1D5DB] bg-white hover:border-[#22C55E]"}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className=" w-11 h-11 rounded-xl bg-[#22C55E] flex items-center justify-center  shrink-0 ">
                            <span className="text-white text-[28px] leading-none">
                              +
                            </span>
                          </div>

                          <div>
                            <h3 className="text-[18px] font-bold text-[#15803D]">
                              Use a different address
                            </h3>

                            <p className="text-sm text-[#6B7280] mt-1">
                              Enter a new shipping address manually
                            </p>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
                {/*  */}
                <div className="rounded-xl border border-[#D9E5FF] bg-[#EEF4FF] p-4 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#DCE8FF] flex items-center justify-center shrink-0">
                    <ShieldCheck size={16} className="text-[#2563EB]" />
                  </div>

                  <div>
                    <h3 className="text-[#2563EB] text-[15px] font-semibold">
                      Delivery Information
                    </h3>

                    <p className="text-[#2563EB] text-sm mt-1">
                      {selectedAddress
                        ? "Using your saved address. You can edit the details below if needed."
                        : "Please ensure your address is accurate for smooth delivery"}
                    </p>
                  </div>
                </div>

                {/* form */}
                <div className="mt-6 space-y-5">
                  {/* city */}
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">
                      City *
                    </label>

                    <div className="relative">
                      <Building2
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        type="text"
                        {...register("city", {
                          required: "City is required",
                          minLength: {
                            value: 2,
                            message: "City name must be at least 2 characters",
                          },
                        })}
                        placeholder="e.g. Cairo, Alexandria, Giza"
                        className={` w-full h-14 rounded-xl border ${errors.city ? "border-red-400" : "border-gray-200"} pl-12 pr-4 text-[15px] outline-none focus:border-[#16A34A] focus:ring-2 focus:ring-green-100 transition`}
                      />

                      {errors.city && (
                        <p className="text-red-500 text-sm mt-2">
                          • {errors.city.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* address */}
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">
                      Street Address *
                    </label>

                    <div className="relative">
                      <MapPin
                        size={18}
                        className="absolute left-4 top-5 text-gray-400"
                      />

                      <textarea
                        {...register("details", {
                          required: "Address is required",
                          minLength: {
                            value: 10,
                            message:
                              "Address details must be at least 10 characters",
                          },
                        })}
                        placeholder="Street name, building number, floor, apartment..."
                        className={` w-full min-h-[120px] rounded-xl border ${errors.details ? "border-red-400" : "border-gray-200"} pl-12 pr-4 py-4 text-[15px] outline-none resize-none focus:border-[#16A34A] focus:ring-2 focus:ring-green-100 transition`}
                      />

                      {errors.details && (
                        <p className="text-red-500 text-sm mt-2">
                          • {errors.details.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* phone */}
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">
                      Phone Number *
                    </label>

                    <div className="relative">
                      <Phone
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        type="text"
                        {...register("phone", {
                          required: "Phone is required",
                          pattern: {
                            value: /^01[0125][0-9]{8}$/,
                            message:
                              "Please enter a valid Egyptian phone number",
                          },
                        })}
                        placeholder="01xxxxxxxxx"
                        className={`w-full h-14 rounded-xl border ${errors.phone ? "border-red-400" : "border-gray-200"} pl-12 pr-36 text-[15px] outline-none focus:border-[#16A34A] focus:ring-2 focus:ring-green-100 transition`}
                      />

                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-2">
                          • {errors.phone.message}
                        </p>
                      )}

                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                        Egyptian numbers only
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* payment */}
            <div className="rounded-2xl border border-[#E5E7EB] bg-white shadow-sm overflow-hidden">
              {/* header */}
              <div className="bg-[#16A34A] px-6 py-5 text-white">
                <div className="flex items-center gap-3">
                  <CreditCard size={20} />

                  <div>
                    <h2 className="text-[20px] font-semibold">
                      Payment Method
                    </h2>

                    <p className="text-green-100 text-sm mt-1">
                      Choose how you'd like to pay
                    </p>
                  </div>
                </div>
              </div>

              {/* body */}
              <div className="p-6 space-y-4">
                {/* cash */}
                <label
                  onClick={() => setPaymentMethod("cash")}
                  className={` flex items-center justify-between rounded-2xl p-5 cursor-pointer transition ${paymentMethod === "cash" ? "border-2 border-[#22C55E] bg-[#F0FDF4]" : "border border-[#E5E7EB] bg-white hover:border-[#16A34A]"}`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={` w-14 h-14 rounded-xl flex items-center justify-center transition ${paymentMethod === "cash" ? "bg-[#22C55E]" : "bg-gray-100"} `}
                    >
                      <Truck
                        size={24}
                        className={
                          paymentMethod === "cash"
                            ? "text-white"
                            : "text-gray-400"
                        }
                      />
                    </div>

                    <div>
                      <h3 className="text-[18px] font-semibold text-[#166534]">
                        Cash on Delivery
                      </h3>

                      <p className="text-sm text-[#4B5563] mt-1">
                        Pay when your order arrives at your doorstep
                      </p>
                    </div>
                  </div>

                  <div
                    className={` w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${paymentMethod === "cash" ? "bg-[#16A34A]" : "border-2 border-gray-300 bg-white"}`}
                  >
                    {paymentMethod === "cash" && "✓"}
                  </div>
                </label>

                {/* online */}
                <label
                  onClick={() => setPaymentMethod("online")}
                  className={` flex items-center justify-between rounded-2xl p-5 cursor-pointer transition ${paymentMethod === "online" ? "border-2 border-[#22C55E] bg-[#F0FDF4]" : "border border-[#E5E7EB] bg-white hover:border-[#16A34A]"}`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={` w-14 h-14 rounded-xl flex items-center justify-center transition ${paymentMethod === "online" ? "bg-[#22C55E]" : "bg-gray-100"}`}
                    >
                      <CreditCard
                        size={24}
                        className={
                          paymentMethod === "online"
                            ? "text-white"
                            : "text-gray-400"
                        }
                      />
                    </div>

                    <div>
                      <h3 className="text-[18px] font-semibold text-[#111827]">
                        Pay Online
                      </h3>

                      <p className="text-sm text-[#6B7280] mt-1">
                        Secure payment with Credit/Debit Card via Stripe
                      </p>

                      <div className="flex items-center gap-2 mt-3">
                        <div className="px-2 py-1 rounded bg-blue-600 text-white text-[10px] font-bold">
                          VISA
                        </div>

                        <div className="px-2 py-1 rounded bg-orange-500 text-white text-[10px] font-bold">
                          MC
                        </div>

                        <div className="px-2 py-1 rounded bg-blue-500 text-white text-[10px] font-bold">
                          AMEX
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={` w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${paymentMethod === "online" ? "bg-[#16A34A]" : "border-2 border-gray-300 bg-white"} `}
                  >
                    {paymentMethod === "online" && "✓"}
                  </div>
                </label>

                {/* secure */}
                <div className="rounded-2xl border border-[#DCFCE7] bg-[#F0FDF4] p-5 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#DCFCE7] flex items-center justify-center shrink-0">
                    <ShieldCheck size={18} className="text-[#16A34A]" />
                  </div>

                  <div>
                    <h3 className="text-[#166534] font-semibold text-[16px]">
                      Secure & Encrypted
                    </h3>

                    <p className="text-[#16A34A] text-sm mt-1">
                      Your payment info is protected with 256-bit SSL encryption
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="sticky top-24 w-full max-w-[500px]">
            <div className="rounded-2xl border border-[#E5E7EB] bg-white shadow-sm overflow-hidden">
              {/* header */}
              <div className="bg-[#16A34A] px-6 py-5 text-white">
                <h2 className="text-[20px] font-semibold">Order Summary</h2>

                <p className="text-green-100 text-sm mt-2">
                  {data?.numOfCartItems} items
                </p>
              </div>

              {/* body */}
              <div className="p-5">
                {/* products */}
                <div className="space-y-3 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
                  {data?.data?.products.map((item) => (
                    <div
                      key={item._id}
                      className="
                      flex items-center gap-3 rounded-xl bg-[#F9FAFB] border border-[#F3F4F6] p-2.5"
                    >
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-white border border-gray-100 shrink-0">
                        <Image
                          src={item.product.imageCover}
                          alt={item.product.title}
                          fill
                          className="object-cover p-2"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-[15px] font-semibold text-[#111827] truncate">
                          {item.product.title}
                        </h3>

                        <p className="text-xs text-gray-500 mt-1">
                          {item.count} × {item.price} EGP
                        </p>
                      </div>

                      <span className="text-[16px] font-bold text-[#111827]">
                        {item.price * item.count}
                      </span>
                    </div>
                  ))}
                </div>

                {/* totals */}
                <div className="mt-5 border-t border-[#E5E7EB] pt-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[#6B7280] text-[15px]">Subtotal</span>

                    <span className="text-[16px] font-semibold text-[#111827]">
                      {data?.data?.totalCartPrice} EGP
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#6B7280] text-[15px] flex items-center gap-2">
                      <Truck size={16} />
                      Shipping
                    </span>

                    <span className="text-[#16A34A] text-[16px] font-semibold">
                      FREE
                    </span>
                  </div>

                  <div className="border-t border-[#E5E7EB] pt-4 flex items-end justify-between">
                    <span className="text-[18px] font-semibold text-[#111827]">
                      Total
                    </span>

                    <div className="text-right leading-none">
                      <span className="text-[40px] font-bold tracking-tight text-[#16A34A]">
                        {data?.data?.totalCartPrice}
                      </span>

                      <span className="text-[#9CA3AF] text-[14px] ml-1 font-medium">
                        EGP
                      </span>
                    </div>
                  </div>
                </div>

                {/* button */}
                <button
                  type="button"
                  onClick={handleSubmit(onSubmit)}
                  className="mt-6 w-full h-14 rounded-xl bg-[#16A34A] hover:bg-[#15803D] transition text-white text-[18px] font-semibold shadow-sm flex items-center justify-center gap-2"
                >
                  <Lock size={18} />

                  {paymentMethod === "online"
                    ? "Proceed to Payment"
                    : "Place Order"}
                </button>

                {/* footer */}
                <div className="mt-6 flex items-center justify-center gap-5 text-[#6B7280] text-sm">
                  <span className="flex items-center gap-2">
                    <ShieldCheck size={14} />
                    Secure
                  </span>

                  <span className="w-[1px] h-4 bg-gray-200" />

                  <span className="flex items-center gap-2">
                    <Truck size={14} />
                    Fast Delivery
                  </span>

                  <span className="w-[1px] h-4 bg-gray-200" />

                  <span className="flex items-center gap-2">
                    <ShieldCheck size={14} />
                    Easy Returns
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
