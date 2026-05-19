"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("q") || "");

  useEffect(() => {
    setSearch(searchParams.get("q") || "");
  }, [searchParams]);

  useEffect(() => {
    const delay = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (search.trim()) {
        params.set("q", search);
      } else {
        params.delete("q");
      }

      router.push(`/search?${params.toString()}`);
    }, 500);

    return () => clearTimeout(delay);
  }, [search, router, searchParams]);

  return (
    <div className="flex max-w-2xl flex-1 items-center overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition focus-within:border-green-500">
      <div className="px-4 text-gray-400">
        <Search size={20} />
      </div>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for products..."
        className="h-14 flex-1 bg-transparent px-2 text-[15px] outline-none"
      />
    </div>
  );
}
