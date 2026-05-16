"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function SortSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sort = searchParams.get("sort") || "relevance";

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-500">Sort by:</span>

      <select
        value={sort}
        onChange={(e) => {
          const params = new URLSearchParams(searchParams.toString());

          params.set("sort", e.target.value);

          router.push(`/search?${params.toString()}`);
        }}
        className="h-10 rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-600 outline-none focus:border-green-500"
      >
        <option value="relevance">Relevance</option>

        <option value="price-low">Price: Low to High</option>

        <option value="price-high">Price: High to Low</option>

        <option value="rating-high">Rating: High to Low</option>

        <option value="name-asc">Name: A to Z</option>

        <option value="name-desc">Name: Z to A</option>
      </select>
    </div>
  );
}
