"use client";

import { useState } from "react";
import { ProductInterface } from "@/app/interfaces/Product.interface";
import { Check, Truck, RotateCcw, ShieldCheck } from "lucide-react";

import ProductReviews from "@/app/_components/reviews/ProductReviews";
import type { ReviewInterface } from "@/app/interfaces/review.interface";



export default function ProductTabs({
  data,
  reviews,
}: {
  data: ProductInterface;
  reviews: ReviewInterface[];
}) {
  const [activeTab, setActiveTab] = useState<
    "details" | "reviews" | "shipping"
  >("details");

  return (
    <div className="mt-10 px-6">
      {/* Tabs */}
      <div className="flex gap-6 border-b mb-6">
        {["details", "reviews", "shipping"].map((tab) => (
          <button
            key={tab}
            onClick={() =>
              setActiveTab(tab as "details" | "reviews" | "shipping")
            }
            className={`pb-2 capitalize ${activeTab === tab
              ? "border-b-2 border-green-600 text-green-600"
              : "text-gray-500"
              }`}
          >
            {tab === "reviews"
              ? `Reviews (${reviews.length})`
              : tab === "shipping"
                ? "Shipping & Returns"
                : "Product Details"}
          </button>
        ))}
      </div>

      {/* Product Details */}
      {activeTab === "details" && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-800">
            About this Product
          </h3>

          <p className="text-gray-500">
            Material Polyester Blend Colour Name Multicolour Department Women
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* LEFT BOX */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold mb-4">Product Information</h4>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Category</span>
                  <span>{data.category?.name}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Subcategory</span>
                  <span>{data.subcategory[0]?.name}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Brand</span>
                  <span>{data.brand?.name}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Items Sold</span>
                  <span>842+ sold</span>
                </div>
              </div>
            </div>

            {/* RIGHT BOX */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold mb-4">Key Features</h4>

              <ul className="space-y-3 text-sm">
                {[
                  "Premium Quality Product",
                  "100% Authentic Guarantee",
                  "Fast & Secure Packaging",
                  "Quality Tested",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check size={16} className="text-green-600" />

                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      {/* REVIEWS */}
      {activeTab === "reviews" && (
        <ProductReviews
          data={data}
          reviews={reviews}
        />
      )}


      {/* Shipping */}
      {
        activeTab === "shipping" && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* SHIPPING */}
              <div className="bg-green-50 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-600 p-2 rounded-full">
                    <Truck size={18} className="text-white" />
                  </div>

                  <h4 className="font-semibold">Shipping Information</h4>
                </div>

                <ul className="space-y-3 text-sm text-gray-700">
                  {[
                    "Free shipping on orders over $50",
                    "Standard delivery: 3-5 business days",
                    "Express delivery available (1-2 days)",
                    "Track your order in real-time",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="bg-green-600 rounded-full p-[2px]">
                        <Check size={12} className="text-white" />
                      </div>

                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* RETURNS */}
              <div className="bg-green-50 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-600 p-2 rounded-full">
                    <RotateCcw size={18} className="text-white" />
                  </div>

                  <h4 className="font-semibold">Returns & Refunds</h4>
                </div>

                <ul className="space-y-3 text-sm text-gray-700">
                  {[
                    "30-day hassle-free returns",
                    "Full refund or exchange available",
                    "Free return shipping on defective items",
                    "Easy online return process",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="bg-green-600 rounded-full p-[2px]">
                        <Check size={12} className="text-white" />
                      </div>

                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* BOTTOM BOX */}
            <div className="bg-gray-100 p-5 rounded-xl flex items-center gap-3">
              <div className="bg-gray-300 p-2 rounded-full">
                <ShieldCheck size={20} className="text-gray-700" />
              </div>

              <div>
                <h4 className="font-semibold text-sm">
                  Buyer Protection Guarantee
                </h4>

                <p className="text-xs text-gray-500">
                  Get a full refund if your order doesn't arrive or isn't as
                  described.
                </p>
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
}
