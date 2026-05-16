"use client";

import ClipLoader from "react-spinners/ClipLoader";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <ClipLoader color="#16A34A" size={45} speedMultiplier={1} />

      <p className="text-lg font-medium text-gray-500">Loading products...</p>
    </div>
  );
}
