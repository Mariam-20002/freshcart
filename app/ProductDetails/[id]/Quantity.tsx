"use client";

import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
export default function Quantity({
  stock,
  price,
}: {
  stock: number;
  price: number;
}) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex flex-col gap-3">
      {/* Quantity */}
      <div className="flex items-center gap-4">
        <div className="flex items-center border rounded-lg overflow-hidden h-[45px]">
          {/* - */}
          <button
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            className="px-4 h-full border-r hover:bg-gray-100"
          >
            <FiMinus size={16} />
          </button>

          <div className="relative w-[70px] pr-2 h-full flex items-center justify-center group">
            <span className="text-base font-medium">{quantity}</span>

            {/* arrows */}
            <div className="absolute right-0 top-0 h-full w-[20px] bg-gray-50 border-l flex flex-col opacity-0 group-hover:opacity-100 transition">
              {/* up */}
              <button
                onClick={() => setQuantity((prev) => Math.min(stock, prev + 1))}
                className="flex-1 flex items-center justify-center text-gray-600 hover:bg-gray-200 border-b"
              >
                <FaChevronUp size={10} />
              </button>

              {/* down */}
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="flex-1 flex items-center justify-center text-gray-600 hover:bg-gray-200"
              >
                <FaChevronDown size={10} />
              </button>
            </div>
          </div>
          {/* + */}
          <button
            onClick={() => setQuantity((prev) => Math.min(stock, prev + 1))}
            className="px-4 h-full border-l hover:bg-gray-100"
          >
            <FiPlus size={16} />
          </button>
        </div>

        <span className="text-sm text-gray-500">{stock} available</span>
      </div>

      {/* Total */}
      <div className="bg-gray-100 rounded-lg p-3 flex justify-between items-center">
        <span className="text-gray-600 text-sm">Total Price:</span>
        <span className="text-green-600 font-bold">{price * quantity} EGP</span>
      </div>
    </div>
  );
}
