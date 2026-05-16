"use client";

import Image from "next/image";
import { ChevronDown, ChevronUp, CreditCard } from "lucide-react";
import { useState } from "react";
import type { OrderInterface } from "@/app/allorders/interfaces/order.interface";

export default function OrderCard({ order }: { order: OrderInterface }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-[20px] border border-[#E5E7EB] bg-white px-7 py-8 shadow-sm">
      {/* TOP */}

      <div className="flex items-center justify-between min-h-[140px]">
        {/* LEFT */}

        <div className="flex items-center gap-5">
          {/* IMAGE */}

          <div className="relative shrink-0">
            {order.cartItems.length > 1 && (
              <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#0F172A] text-[10px] font-bold text-white">
                +{order.cartItems.length - 1}
              </div>
            )}

            <Image
              src={order.cartItems[0]?.product.imageCover}
              alt={order.cartItems[0]?.product.title}
              width={90}
              height={90}
              className="h-[72px] w-[72px] rounded-[16px] border border-[#E5E7EB] object-cover"
            />
          </div>

          {/* INFO */}

          <div className="space-y-3">
            {/* STATUS */}

            <div className="inline-flex items-center gap-1 rounded-full bg-[#FEF3C7] px-3 py-1 text-[11px] font-semibold text-[#D97706]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B]"></span>
              Processing
            </div>

            {/* ORDER ID */}

            <h2 className="text-[18px] font-bold leading-none text-[#0F172A]">
              #{order.id}
            </h2>

            {/* META */}

            <div className="flex items-center gap-2 text-[13px] text-[#64748B]">
              <span>
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>

              <span>•</span>

              <span>{order.cartItems.length} items</span>

              <span>•</span>

              <span>{order.shippingAddress.city}</span>
            </div>

            {/* PRICE */}

            <div className="flex items-end gap-1">
              <h3 className="text-[20px] font-bold leading-none text-[#0F172A]">
                {order.totalOrderPrice.toLocaleString("en-US")}
              </h3>

              <span className="text-[14px] text-[#94A3B8]">EGP</span>
            </div>
          </div>
        </div>

        {/* RIGHT */}

        <div className="flex flex-col items-end justify-between self-stretch">
          {/* ICON */}

          <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F8FAFC] text-[#64748B]">
            <CreditCard size={16} />
          </button>

          {/* DETAILS */}

          <button
            onClick={() => setOpen(!open)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-[13px] font-semibold transition ${
              open ? "bg-[#16A34A] text-white" : "bg-[#F8FAFC] text-[#0F172A]"
            }`}
          >
            {open ? "Hide" : "Details"}

            {open ? (
              <ChevronUp size={14} />
            ) : (
              <ChevronDown size={14} className="text-[#64748B]" />
            )}
          </button>
        </div>
      </div>

      {/* DETAILS CONTENT */}

      {open && (
        <div className="mt-8 border-t border-[#E5E7EB] pt-8">
          {/* ORDER ITEMS */}

          <div>
            <h3 className="mb-4 text-[16px] font-bold text-[#0F172A]">
              Order Items
            </h3>

            <div className="space-y-3">
              {order.cartItems.map((item: OrderInterface["cartItems"][0]) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between rounded-2xl border border-[#F1F5F9] p-4"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={item.product.imageCover}
                      alt={item.product.title}
                      width={58}
                      height={58}
                      className="rounded-xl border border-[#E5E7EB] object-cover"
                    />

                    <div>
                      <h4 className="text-[14px] font-semibold text-[#0F172A]">
                        {item.product.title}
                      </h4>

                      <p className="mt-1 text-[13px] text-[#64748B]">
                        {item.count} × {item.price} EGP
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <h5 className="text-[18px] font-bold text-[#0F172A]">
                      {item.price.toLocaleString("en-US")}
                    </h5>

                    <span className="text-[13px] text-[#94A3B8]">EGP</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM */}

          <div className="mt-6 grid grid-cols-2 gap-5">
            {/* ADDRESS */}

            <div className="rounded-2xl border border-[#E5E7EB] p-5">
              <h4 className="mb-3 text-[15px] font-bold text-[#0F172A]">
                Delivery Address
              </h4>

              <div className="space-y-2 text-[14px] text-[#64748B]">
                <p>{order.shippingAddress.city}</p>

                <p>{order.shippingAddress.details}</p>

                <p>{order.shippingAddress.phone}</p>
              </div>
            </div>

            {/* SUMMARY */}

            <div className="rounded-2xl border border-[#FCD34D] bg-[#FEF9C3] p-5">
              <h4 className="mb-4 text-[15px] font-bold text-[#0F172A]">
                Order Summary
              </h4>

              <div className="space-y-3 text-[14px]">
                <div className="flex items-center justify-between text-[#64748B]">
                  <span>Subtotal</span>

                  <span>
                    {order.totalOrderPrice.toLocaleString("en-US")} EGP
                  </span>
                </div>

                <div className="flex items-center justify-between text-[#64748B]">
                  <span>Shipping</span>

                  <span>Free</span>
                </div>

                <div className="border-t border-[#FCD34D] pt-3">
                  <div className="flex items-center justify-between font-bold text-[#0F172A]">
                    <span>Total</span>

                    <span>
                      {order.totalOrderPrice.toLocaleString("en-US")} EGP
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
