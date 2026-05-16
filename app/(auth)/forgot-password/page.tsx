

import ForgotPasswordForm from "./ForgotPasswordForm";

import { LockKeyhole, Mail, ShieldCheck } from "lucide-react";

import { FaClock } from "react-icons/fa";

import { IoShieldHalf } from "react-icons/io5";

export default function Page() {
  return (
    <div className="px-6 py-12">
      <div className="w-full max-w-[1300px] mx-auto grid lg:grid-cols-[1fr_1fr] items-center">
        {/* LEFT */}
        <div className="hidden lg:flex justify-center">
          <div className="w-full max-w-[616px]">
            {/* IMAGE */}
            <div className="relative h-[384px] rounded-2xl bg-[#F4FBF5] overflow-hidden shadow-sm mb-10">
              {/* circles */}
              <div className="absolute w-24 h-24 rounded-full bg-[#DCFCE7]/50 top-6 left-6" />

              <div className="absolute w-32 h-32 rounded-full bg-[#DCFCE7]/50 bottom-10 right-10" />

              {/* center card */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-3deg]">
                <div className="w-20 h-20 rounded-2xl bg-[#DCFCE7] shadow-md flex items-center justify-center">
                  <LockKeyhole className="text-green-600 w-10 h-10" />
                </div>
              </div>

              {/* left mini card */}
              <div className="absolute left-[32%] top-[38%] rotate-[12deg]">
                <div className="w-14 h-14 rounded-xl bg-white shadow-sm flex items-center justify-center">
                  <Mail className="text-green-600 w-6 h-6" />
                </div>
              </div>

              {/* right mini card */}
              <div className="absolute right-[32%] top-[38%] rotate-[-12deg]">
                <div className="w-14 h-14 rounded-xl bg-white shadow-sm flex items-center justify-center">
                  <ShieldCheck className="text-green-600 w-6 h-6" />
                </div>
              </div>
            </div>

            {/* TEXT */}
            <div className="text-center">
              <h2 className="text-[30px] font-bold text-gray-800 mb-4 leading-[36px]">
                Reset Your Password Securely
              </h2>

              <p className="text-gray-500 text-[18px] leading-[28px] font-medium mb-6">
                Don&apos;t worry, we&apos;ll help you recover your account and
                get back to shopping in no time
              </p>

              <div className="flex justify-center items-center gap-8 text-[14px] text-gray-500">
                <span className="flex items-center gap-2">
                  <Mail size={18} className="text-green-600" />

                  <span>Email Verification</span>
                </span>

                <span className="flex items-center gap-2">
                  <IoShieldHalf size={18} className="text-green-600" />

                  <span>Secure Reset</span>
                </span>

                <span className="flex items-center gap-2">
                  <FaClock size={18} className="text-green-600" />

                  <span>Quick Recovery</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex justify-center lg:justify-end">
          <div className="bg-white w-full max-w-[616px] rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.08)] p-8">
            <h2 className="text-green-600 text-[28px] font-black text-center mb-1">
              Fresh
              <span className="text-gray-800">Cart</span>
            </h2>

            <h3 className="text-[22px] font-extrabold text-center mb-2">
              Forgot Password?
            </h3>

            <p className="text-gray-500 text-center mb-6 text-[15px] leading-[24px] font-medium">
              Enter your email and we&apos;ll send you a reset code
            </p>

            <ForgotPasswordForm />
          </div>
        </div>
      </div>
    </div>
  );
}
