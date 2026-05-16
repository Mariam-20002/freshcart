"use client";

import { useState } from "react";
import { ProductInterface } from "@/app/interfaces/Product.interface";
import { Star, Check, Truck, RotateCcw, ShieldCheck } from "lucide-react";

type Review = {
  _id: string;
  review: string;
  rating: number;
  user: {
    name: string;
  };
};

export default function ProductTabs({
  data,
  reviews,
}: {
  data: ProductInterface;
  reviews: Review[];
}) {
  const [activeTab, setActiveTab] = useState<
    "details" | "reviews" | "shipping"
  >("details");

  const hasReviews = reviews.length > 0;

  const average = hasReviews
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    : data.ratingsAverage || 0;

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
            className={`pb-2 capitalize ${
              activeTab === tab
                ? "border-b-2 border-green-600 text-green-600"
                : "text-gray-500"
            }`}
          >
            {tab === "reviews"
              ? `Reviews (${data.ratingsQuantity || 0})`
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
                  <span>Women's Fashion</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Subcategory</span>
                  <span>Women's Clothing</span>
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
        <div className="bg-white p-8 rounded-xl border space-y-10">
          <div className="flex items-center gap-6">
            {/* LEFT */}
            <div className="w-[150px]flex flex-col items-center gap-1 text-center">
              <h2 className="text-4xl font-bold text-gray-900">
                {average.toFixed(1)}
              </h2>

              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i <= Math.round(average)
                        ? "fill-[#facc15] text-[#facc15]"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>

              {/* عدد الريفيوز */}
              <p className="text-xs text-gray-400">
                Based on {data.ratingsQuantity || reviews.length} reviews
              </p>
            </div>

            {/* RIGHT */}
            <div className="flex-1 space-y-4">
              {[5, 4, 3, 2, 1].map((star) => {
                let percent = 0;

                if (hasReviews) {
                  const count = reviews.filter((r) => r.rating === star).length;
                  percent = (count / reviews.length) * 100;
                } else {
                  // fallback زي FreshCart
                  if (star === 5) percent = 25;
                  else if (star === 4) percent = 60;
                  else if (star === 3) percent = 25;
                  else percent = 5;
                }

                return (
                  <div key={star} className="flex items-center gap-4">
                    <span className="w-14 text-sm text-gray-600">
                      {star} star
                    </span>

                    <div className="flex-1 bg-gray-200 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#facc15] h-2.5 rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>

                    <span className="text-sm text-gray-400 w-10 text-right">
                      {Math.round(percent)}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* EMPTY */}
          {!hasReviews && (
            <div className="text-center text-gray-400 py-12">
              <div className="text-5xl mb-3">☆</div>

              <p className="text-sm">
                Customer reviews will be displayed here.
              </p>

              <button className="mt-3 text-green-600 font-medium text-sm hover:underline">
                Write a Review
              </button>
            </div>
          )}
        </div>
      )}

      {/* Shipping */}
      {activeTab === "shipping" && (
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
      )}
    </div>
  );
}
