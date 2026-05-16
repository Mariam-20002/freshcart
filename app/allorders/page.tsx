import Link from "next/link";
import { ClipboardList, ShoppingBag } from "lucide-react";

import { getUserOrders } from "../Apis/orders/orders.api";
import { getUserData } from "../Utilites/getUserData";
import OrderCard from "../_components/orders/OrderCard";
import type { OrderInterface } from "./interfaces/order.interface";

export default async function Page() {
  const user = await getUserData();

  if (!user) {
    return <div>Unauthorized</div>;
  }

  const orders = await getUserOrders(user.id);

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto max-w-[1536px] px-4">
        {orders.length > 0 && (
          <>
            {/* BREADCRUMB */}

            <div className="mb-5 flex items-center gap-2 text-sm text-[#94A3B8]">
              <Link href="/" className="transition hover:text-[#16A34A]">
                Home
              </Link>

              <span>/</span>

              <span className="font-medium text-[#0F172A]">My Orders</span>
            </div>

            {/* HEADER */}

            <div className="mb-10 flex items-center justify-between">
              {/* LEFT */}

              <div className="flex items-center gap-4">
                {/* ICON */}

                <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-[#16A34A] shadow-sm">
                  <ClipboardList size={30} className="text-white" />
                </div>

                {/* TEXT */}

                <div className="space-y-3">
                  <h1 className="text-[25px] font-bold leading-none text-[#0F172A]">
                    My Orders
                  </h1>

                  <p className="mt-2 text-[15px] text-[#64748B]">
                    Track and manage your {orders.length} orders
                  </p>
                </div>
              </div>

              {/* RIGHT */}

              <Link
                href="/products"
                className="flex items-center gap-2 text-[15px] font-semibold text-[#16A34A] no-underline transition hover:text-green-700"
              >
                <ShoppingBag size={16} />
                Continue Shopping
              </Link>
            </div>
          </>
        )}

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center ">
            {/* ICON */}
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-gray-100">
              <ClipboardList size={40} className="text-gray-400" />
            </div>

            {/* TEXT */}
            <h2 className="text-3xl font-bold text-[#0F172A]">No orders yet</h2>

            <p className="mt-3 max-w-md text-center text-[17px] leading-7 text-[#64748B]">
              When you place orders, they&apos;ll appear here so you can track
              them easily.
            </p>

            {/* BUTTON */}
            <Link
              href="/products"
              className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-[#16A34A] px-8 py-4 text-[16px] font-semibold text-white no-underline transition hover:bg-green-700"
            >
              <ShoppingBag size={18} />
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order: OrderInterface) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
