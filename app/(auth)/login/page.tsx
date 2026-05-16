import Image from "next/image";
import LoginForm from "./LoginForm/LoginForm";
import { Truck } from "lucide-react";
import { FaClock } from "react-icons/fa";

import { IoShieldHalf } from "react-icons/io5";
export default function Page() {
  return (
    <div className=" px-6 py-12">
      <div className="w-full max-w-[1300px] mx-auto grid lg:grid-cols-[1fr_1fr] items-center">
        {/* LEFT */}
        <div className="hidden lg:flex justify-center">
          <div className="w-full max-w-[616px]">
            {/* IMAGE */}
            <div className="mb-8">
              <div className="relative w-full aspect-[616/384] overflow-hidden rounded-2xl border border-gray-100 shadow-[0_8px_20px_rgba(0,0,0,0.06)]">
                <Image
                  src="/assets/Login.png"
                  alt="shopping"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* TEXT */}
            <div className="text-center">
              <h2 className="text-[30px] font-bold text-gray-800 mb-4 leading-[36px]">
                FreshCart - Your One-Stop Shop for Fresh Products
              </h2>

              <p className="text-gray-500 text-[18px] leading-[28px] font-medium mb-6">
                Join thousands of happy customers who trust FreshCart for their
                daily grocery needs
              </p>

              <div className="flex justify-center items-center gap-8 text-[14px] text-gray-500">
                <span className="flex items-center gap-2">
                  <Truck size={18} className="text-green-600" />
                  <span>Free Delivery</span>
                </span>

                <span className="flex items-center gap-2">
                  <IoShieldHalf size={18} className="text-green-600" />
                  <span>Secure Payment</span>
                </span>

                <span className="flex items-center gap-2">
                  <FaClock size={18} className="text-green-600" />
                  <span>24/7 Support</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex justify-center lg:justify-end">
          <div className="bg-white w-full max-w-[616px] rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.08)] p-8">
            <h2 className="text-green-600 text-[28px] font-black text-center mb-1">
              Fresh<span className="text-gray-800">Cart</span>
            </h2>

            <h3 className="text-[22px] font-extrabold text-center mb-2">
              Welcome Back!
            </h3>

            <p className="text-gray-500 text-center mb-6 text-[15px] leading-[24px] font-medium">
              Sign in to continue your fresh shopping experience
            </p>

            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
