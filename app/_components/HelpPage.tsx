"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import {
  FaShoppingCart,
  FaArrowLeft,
  FaHome,
  FaAppleAlt,
  FaCarrot,
  FaLeaf,
} from "react-icons/fa";

export default function HelpPage() {
  const floatingIcons = [
    {
      icon: <FaAppleAlt />,
      top: "10%",
      left: "6%",
      delay: 0,
    },
    {
      icon: <FaCarrot />,
      top: "28%",
      right: "8%",
      delay: 1,
    },
    {
      icon: <FaLeaf />,
      top: "78%",
      left: "9%",
      delay: 2,
    },
    {
      icon: <FaLeaf />,
      top: "82%",
      right: "15%",
      delay: 1.5,
    },
    {
      icon: <FaCarrot />,
      top: "52%",
      right: "4%",
      delay: 2.5,
    },
    {
      icon: <FaAppleAlt />,
      top: "58%",
      left: "15%",
      delay: 3,
    },
  ];

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F4F8F5] px-4 py-10">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.06),transparent_65%)]" />

      {/* Water Floating Effect */}
      <motion.div
        animate={{
          scale: [1, 1.03, 1],
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className=" absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4),transparent_70%)] blur-3xl "
      />

      {/* Floating Icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          animate={{
            y: [-18, 18, -18],
            x: [-8, 8, -8],
            rotate: [-8, 8, -8],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: item.delay,
          }}
          className=" absolute text-[#43D579] pointer-events-none drop-shadow-[0_0_12px_rgba(134,239,172,0.25)] "
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
            fontSize: "24px",
          }}
        >
          {item.icon}
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 flex w-full max-w-[560px] flex-col items-center text-center">
        {/* Cart Card */}
        <div className="relative">
          {/* 404 Badge */}
          <motion.div
            animate={{
              y: [-4, 4, -4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -right-5 -top-5 z-20 flex h-16 w-16 items-center justify-center rounded-full
             border-4 border-[#DCFCE7] bg-[#22C55E] text-[24px] font-extrabold text-white shadow-lg"
          >
            404
          </motion.div>

          {/* Card */}
          <motion.div
            animate={{
              y: [-6, 6, -6],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative flex h-[170px] w-[170px] items-center justify-center rounded-[32px] bg-white shadow-[0_15px_40px_rgba(34,197,94,0.1)]"
          >
            <FaShoppingCart className="text-[55px] text-[#4ADE80]" />

            {/* Dots */}
            <div className="absolute bottom-[-24px] flex gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#4ADE80]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#4ADE80]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#4ADE80]" />
            </div>
          </motion.div>
        </div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className=" mt-14 text-[42px] font-extrabold leading-none tracking-[-1px] text-[#0F172A]"
        >
          Oops! Nothing Here
        </motion.h1>

        {/* Description */}
        <p className="mt-4 max-w-[480px] text-[16px] leading-7 text-[#64748B]">
          Looks like this page went out of stock! Don&apos;t worry, there&apos;s
          plenty more fresh content to explore.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-[#16A34A] px-6 text-[15px] 
            font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:bg-[#15803D]"
          >
            <FaHome className="text-sm" />
            Go to Homepage
          </Link>

          <button
            onClick={() => history.back()}
            className=" inline-flex h-12 items-center gap-2 rounded-xl border border-gray-200 bg-white
               px-6 text-[15px] font-semibold text-[#334155] shadow-sm transition-all duration-300 hover:scale-[1.02] "
          >
            <FaArrowLeft className="text-sm" />
            Go Back
          </button>
        </div>

        {/* Popular Links */}
        <div className=" mt-12 w-full rounded-[24px] border border-gray-200 bg-white p-6 shadow-sm">
          <p className="mb-5 text-[12px] font-bold uppercase tracking-[2px] text-[#94A3B8]">
            Popular Destinations
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { name: "All Products", href: "/products" },
              { name: "Categories", href: "/categories" },
              { name: "Today's Deals", href: "/deals" },
              { name: "Contact Us", href: "/contact" },
            ].map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={` rounded-xl px-5 py-2.5 text-[14px] font-medium transition-all duration-300
                  ${index === 0 ? "bg-[#DCFCE7] text-[#15803D]" : "bg-[#F8FAFC] text-[#475569] hover:bg-[#DCFCE7]"}`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
