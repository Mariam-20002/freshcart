import { Truck, RotateCcw, ShieldCheck, Headphones } from "lucide-react";
export function FooterTop() {
  return (
    <div className="bg-green-50 py-6">
      <div className="max-w-[1536px] mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
          {/* 1 */}
          <div className="flex items-center gap-3">
            <div className="bg-green-100 text-green-600 p-3 rounded-full">
              <Truck size={18} />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Free Shipping</p>
              <p className="text-gray-500 text-xs">On orders over 500 EGP</p>
            </div>
          </div>

          {/* 2 */}
          <div className="flex items-center gap-3">
            <div className="bg-green-100 text-green-600 p-3 rounded-full">
              <RotateCcw size={18} />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Easy Returns</p>
              <p className="text-gray-500 text-xs">14-day return policy</p>
            </div>
          </div>

          {/* 3 */}
          <div className="flex items-center gap-3">
            <div className="bg-green-100 text-green-600 p-3 rounded-full">
              <ShieldCheck size={18} />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Secure Payment</p>
              <p className="text-gray-500 text-xs">100% secure checkout</p>
            </div>
          </div>

          {/* 4 */}
          <div className="flex items-center gap-3">
            <div className="bg-green-100 text-green-600 p-3 rounded-full">
              <Headphones size={18} />
            </div>
            <div>
              <p className="font-semibold text-gray-800">24/7 Support</p>
              <p className="text-gray-500 text-xs">Contact us anytime</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
