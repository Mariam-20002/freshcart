"use client";

import { useState } from "react";
import ProductItem from "@/app/_components/ProductItem/ProductItem";
import { LayoutGrid, SlidersHorizontal } from "lucide-react";

import type { ProductInterface } from "@/app/interfaces/Product.interface";

interface ProductsViewProps {
  currentProducts: ProductInterface[];
  children: React.ReactNode;
}

export default function ProductsView({
  currentProducts,
  children,
}: ProductsViewProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center rounded-2xl border border-gray-200 bg-white p-1 shadow-sm">
          <button
            onClick={() => setViewMode("grid")}
            className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${
              viewMode === "grid"
                ? "bg-green-600 text-white"
                : "text-gray-500 hover:text-green-600"
            }`}
          >
            <LayoutGrid size={18} />
          </button>

          <button
            onClick={() => setViewMode("list")}
            className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${
              viewMode === "list"
                ? "bg-green-600 text-white"
                : "text-gray-500 hover:text-green-600"
            }`}
          >
            <SlidersHorizontal size={18} />
          </button>
        </div>

        {children}
      </div>

      <div
        className={`grid gap-6 ${
          viewMode === "grid"
            ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-4"
            : "grid-cols-1"
        }`}
      >
        {currentProducts.map((prod) => (
          <ProductItem key={prod._id} prod={prod} />
        ))}
      </div>
    </>
  );
}
