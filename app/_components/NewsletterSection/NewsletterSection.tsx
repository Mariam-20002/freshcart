"use client";
import React from "react";
import { CheckCircle, Mail } from "lucide-react";
import { FaLeaf, FaTruck, FaTag } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import { IoStarSharp } from "react-icons/io5";
import { BsStars } from "react-icons/bs";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // validation cleaner
  const validateEmail = (value: string) => {
    if (!value) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "Invalid email format";
    }
    return "";
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationError = validateEmail(email);

    if (validationError) {
      setError(validationError);
      setSuccess(false);
      return;
    }

    setError("");
    setSuccess(true);
    setEmail("");
  };

  return (
    <section className="py-10">
      <div className="max-w-[1536px] mx-auto ">
        <div
          className="rounded-[40px] p-6 md:p-10 
          bg-gradient-to-br from-[#d9fbe8] via-[#ecfdf5] to-[#f8fafc]
          border border-white/60
          shadow-[40px_-40px_100px_25px_rgba(16,185,129,0.09),_-40px_40px_100px_25px_rgba(16,185,129,0.07)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* LEFT */}
            <div className=" space-y-6 lg:col-span-2">
              {/* Header */}
              <div className="flex items-center gap-3">
                <div className="bg-green-500 text-white p-3 rounded-2xl shadow">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500">NEWSLETTER</p>
                  <p className="text-xs text-gray-400">50,000+ subscribers</p>
                </div>
              </div>
              {/* Title */}
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                Get the Freshest Updates{" "}
                <span className="text-green-600">Delivered Free</span>
              </h2>
              {/* Desc */}
              <p className="text-gray-500 text-sm">
                Weekly recipes, seasonal offers & exclusive member perks.
              </p>
              {/* Tags */}
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: <FaLeaf />, text: "Fresh Picks Weekly" },
                  { icon: <FaTruck />, text: "Free Delivery Codes" },
                  { icon: <FaTag />, text: "Members-Only Deals" },
                ].map((item, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-2 bg-white/60 border border-green-200 px-4 py-2 rounded-full text-sm shadow-sm"
                  >
                    <span className="bg-green-100 p-2 rounded-full text-green-600">
                      {item.icon}
                    </span>
                    <span className="text-gray-700">{item.text}</span>
                  </span>
                ))}
              </div>
              {/* FORM */}
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  disabled={success}
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                    if (success) setSuccess(false);
                  }}
                  placeholder="you@example.com"
                  className={`flex-1 px-5 py-3 rounded-xl border-2 
                  ${error ? "border-red-400 focus:ring-red-200" : "border-green-300 focus:ring-green-200"}
                  bg-white/80 outline-none transition
                  focus:border-green-500 focus:ring-4
                  shadow-sm placeholder:text-gray-400`}
                />

                <button
                  type="submit"
                  disabled={!email || success}
                  className={`px-6 py-3 rounded-xl text-white transition-all duration-300 ease-in-out flex items-center gap-2 justify-center                    
                 ${success
                      ? "bg-green-500 scale-105 shadow-[0_6px_20px_rgba(34,197,94,0.35)]"
                      : !email
                        ? "bg-green-300 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                >
                  {success ? (
                    <>
                      <CheckCircle size={18} />
                      You're In!
                    </>
                  ) : (
                    "Subscribe →"
                  )}
                </button>
              </form>
              {/* Messages */}
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              {success && (
                <p className="text-green-600 text-sm mt-2">
                  Subscribed successfully
                </p>
              )}
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <BsStars className="text-yellow-500 text-lg  rotate-270" />
                Unsubscribe anytime. No spam, ever.
              </p>
            </div>

            {/* RIGHT */}
            <div className="lg:col-span-1 rounded-3xl p-6 md:p-8 text-white bg-gradient-to-br from-[#0f172a] to-[#1e293b] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-green-500/20 blur-3xl"></div>

              <span className="text-xs bg-green-500/20 px-3 py-1 rounded-full">
                📱 MOBILE APP
              </span>

              <h3 className="text-xl font-bold mt-4">Shop Faster on Our App</h3>

              <p className="text-sm text-gray-300 mt-1">
                Get app-exclusive deals & 15% off your first order.
              </p>

              <div className="mt-6 space-y-3">
                <a
                  href="https://apps.apple.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full bg-white/10 px-4 py-3 rounded-xl 
               hover:bg-white/20 transition-all duration-200 hover:scale-[1.02] active:scale-95"
                >
                  <FaApple size={20} />
                  <div className="text-left">
                    <p className="text-xs text-gray-300">Download on</p>
                    <p className="text-sm font-semibold text-white">
                      App Store
                    </p>
                  </div>
                </a>

                <a
                  href="https://play.google.com/store"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full bg-white/10 px-4 py-3 rounded-xl 
               hover:bg-white/20 transition-all duration-200 hover:scale-[1.02] active:scale-95"
                >
                  <FaGooglePlay size={20} />
                  <div className="text-left">
                    <p className="text-xs text-gray-300">Get it on</p>
                    <p className="text-sm font-semibold text-white">
                      Google Play
                    </p>
                  </div>
                </a>
              </div>

              <div className="flex items-center gap-0.5 mt-5 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <IoStarSharp key={i} size={10} />
                ))}
                <span className="text-gray-300 text-xs ml-2">
                  4.9 • 100K+ downloads
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
