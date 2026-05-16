"use client";

import type { BrandInterface } from "@/app/Apis/brands.api";
import type { CategoryInterface } from "@/app/Apis/categories.api";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  categories: CategoryInterface[];
  brands: BrandInterface[];
}

export default function SidebarFilters({ categories, brands }: Props) {
  const router = useRouter();

  const searchParams = useSearchParams();

  const selectedCategories = searchParams.getAll("category");

  const selectedBrands = searchParams.getAll("brand");

  const minPrice = searchParams.get("minPrice") || "";

  const maxPrice = searchParams.get("maxPrice") || "";
  // Category Toggle
  const handleCategoryChange = (categoryId: string) => {
    const params = new URLSearchParams(searchParams.toString());

    const categories = params.getAll("category");

    if (categories.includes(categoryId)) {
      params.delete("category");

      categories
        .filter((id) => id !== categoryId)
        .forEach((id) => params.append("category", id));
    } else {
      params.append("category", categoryId);
    }

    params.set("page", "1");

    router.push(`/search?${params.toString()}`);
  };

  // Brand Toggle
  const handleBrandChange = (brandId: string) => {
    const params = new URLSearchParams(searchParams.toString());

    const brands = params.getAll("brand");

    if (brands.includes(brandId)) {
      params.delete("brand");

      brands
        .filter((id) => id !== brandId)
        .forEach((id) => params.append("brand", id));
    } else {
      params.append("brand", brandId);
    }

    params.set("page", "1");

    router.push(`/search?${params.toString()}`);
  };

  const handlePriceChange = (type: "minPrice" | "maxPrice", value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(type, value);
    } else {
      params.delete(type);
    }

    params.set("page", "1");

    router.push(`/search?${params.toString()}`);
  };

  const handleQuickPrice = (min: number, max?: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("minPrice", String(min));

    if (max) {
      params.set("maxPrice", String(max));
    } else {
      params.delete("maxPrice");
    }

    params.set("page", "1");

    router.push(`/search?${params.toString()}`);
  };
  return (
    <aside className="sticky top-24 hidden h-fit w-[260px] rounded-3xl border border-gray-100 bg-white p-6 shadow-sm lg:block">
      {/* Categories */}
      <div className="mb-8">
        <h3 className="mb-5 text-lg font-bold text-gray-900">Categories</h3>

        <div className="max-h-[220px] space-y-3 overflow-y-auto pr-2">
          {categories.map((item) => (
            <label
              key={item._id}
              className="flex cursor-pointer items-center gap-3 text-sm text-gray-600"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(item._id)}
                onChange={() => handleCategoryChange(item._id)}
                className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />

              {item.name}
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="mb-8 border-t border-gray-100 pt-6">
        <h3 className="mb-5 text-xl font-bold text-gray-900">Price Range</h3>

        {/* Inputs */}
        <div className="mb-4 flex gap-3">
          <div className="flex-1">
            <label className="mb-2 block text-sm font-medium text-gray-500">
              Min (EGP)
            </label>

            <input
              type="number"
              placeholder="0"
              value={minPrice}
              onChange={(e) => handlePriceChange("minPrice", e.target.value)}
              className="h-12 w-full rounded-2xl border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none transition focus:border-green-500"
            />
          </div>

          <div className="flex-1">
            <label className="mb-2 block text-sm font-medium text-gray-500">
              Max (EGP)
            </label>
            <input
              type="number"
              placeholder="No limit"
              value={maxPrice}
              onChange={(e) => handlePriceChange("maxPrice", e.target.value)}
              className="h-12 w-full rounded-2xl border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none transition focus:border-green-500"
            />
          </div>
        </div>

        {/* Quick Prices */}
        <div className="flex flex-wrap gap-3">
          {[
            { label: "Under 500", min: 0, max: 500 },
            { label: "Under 1K", min: 0, max: 1000 },
            { label: "Under 5K", min: 0, max: 5000 },
            { label: "Under 10K", min: 0, max: 10000 },
          ].map((price) => {
            const isActive =
              Number(minPrice) === price.min && Number(maxPrice) === price.max;

            return (
              <button
                key={price.label}
                onClick={() => handleQuickPrice(price.min, price.max)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-green-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-700"
                }`}
              >
                {price.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Brands */}
      <div className="border-t pt-6">
        <h3 className="mb-5 text-lg font-bold text-gray-900">Brands</h3>

        <div className="max-h-[220px] space-y-3 overflow-y-auto pr-2">
          {brands.map((brand) => (
            <label
              key={brand._id}
              className="flex cursor-pointer items-center gap-3 text-sm text-gray-600"
            >
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand._id)}
                onChange={() => handleBrandChange(brand._id)}
                className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />

              {brand.name}
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
