import Products from "./_components/Products/Products";
import { Truck, ShieldCheck, RotateCcw, Headphones } from "lucide-react";
import Slider1 from "../public/assets/slider 1.png";
import Slider2 from "../public/assets/slider 2.png";
import Slider3 from "../public/assets/slider 3.png";
import MySlider from "./_components/Slider/Slider";
import Categories from "./_components/categories/categories";
import Link from "next/link";
import { BsStars } from "react-icons/bs";
import { HiFire } from "react-icons/hi";
import NewsletterSection from "./_components/NewsletterSection/NewsletterSection";

export default async function Home() {
  return (
    <>
      <section className="relative">
        <div className="absolute inset-0 w-screen left-1/2 -translate-x-1/2 bg-gray-50 -z-10"></div>

        <MySlider
          slidesPerView={1}
          pageList={[
            {
              img: Slider1.src,
              title: "Fresh Products Delivered to your Door",
              desc: "Get 20% off your first order",
              btn1: "Shop Now",
              btn2: "View Deals",
            },
            {
              img: Slider2.src,
              title: "Premium Quality Guaranteed",
              desc: "Fresh from farm to your table",
              btn1: "Shop Now",
              btn2: "Learn More",
            },
            {
              img: Slider3.src,
              title: "Fast & Free Delivery",
              desc: "Same day delivery available",
              btn1: "Order Now",
              btn2: "Delivery Info",
            },
          ]}
        />

        {/* Services */}

        <div className="max-w-[1536px] mx-auto px-4 md:px-6 lg:px-8 py-10 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* 1 */}
            <div className="flex items-center gap-4 p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition">
              <div className="bg-green-100 text-green-600 p-3 rounded-full">
                <Truck size={20} />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">
                  Free Shipping
                </p>
                <p className="text-gray-500 text-xs">On orders over 500 EGP</p>
              </div>
            </div>

            {/* 2 */}
            <div className="flex items-center gap-4 p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition">
              <div className="bg-green-100 text-green-600 p-3 rounded-full">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">
                  Secure Payment
                </p>
                <p className="text-gray-500 text-xs">
                  100% secure transactions
                </p>
              </div>
            </div>

            {/* 3 */}
            <div className="flex items-center gap-4 p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition">
              <div className="bg-green-100 text-green-600 p-3 rounded-full">
                <RotateCcw size={20} />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">
                  Easy Returns
                </p>
                <p className="text-gray-500 text-xs">14-day return policy</p>
              </div>
            </div>

            {/* 4 */}
            <div className="flex items-center gap-4 p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition">
              <div className="bg-green-100 text-green-600 p-3 rounded-full">
                <Headphones size={20} />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">
                  24/7 Support
                </p>
                <p className="text-gray-500 text-xs">Contact us anytime</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1536px] mx-auto px-4   md:px-6 lg:px-8 py-10 space-y-10  ">
        {/* Shop By Category */}
        <Categories />

        {/* cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {/* Card 1 */}
          <div className="relative rounded-2xl p-6 md:p-8 text-white overflow-hidden bg-gradient-to-r from-green-500 to-green-700 hover:shadow-lg transition duration-300">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>

            {/* badge */}
            <span className="flex items-center gap-1 text-xs bg-white/20 px-3 py-1 rounded-full w-fit">
              <HiFire
                size={18}
                className="text-orange-500 drop-shadow-[0_0_12px_rgba(255,80,0,1)]"
              />
              Deal of the Day
            </span>

            {/* title */}
            <h3 className="text-xl md:text-2xl font-semibold mt-4 leading-snug">
              Fresh Organic Fruits
            </h3>

            <p className="text-sm md:text-base opacity-90 mt-2">
              Get up to 40% off on selected organic fruits
            </p>

            {/* price */}
            <div className="flex items-center gap-3 mt-4">
              <span className="text-2xl md:text-3xl font-bold">40% OFF</span>
              <span className="text-sm opacity-80">Use code: ORGANIC40</span>
            </div>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 mt-5 bg-white text-green-600 px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition"
            >
              Shop Now →
            </Link>
          </div>

          {/* Card 2 */}
          <div className="relative rounded-2xl p-6 md:p-8 text-white overflow-hidden bg-gradient-to-r from-orange-400 to-red-500 hover:shadow-lg transition duration-300">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>

            {/* badge */}

            <span className="flex items-center gap-1 text-xs bg-white/20 px-3 py-1 rounded-full w-fit">
              <BsStars size={18} className="text-yellow-300  -rotate-90" />
              New Arrivals
            </span>

            {/* title */}
            <h3 className="text-xl md:text-2xl font-semibold mt-4 leading-snug">
              Exotic Vegetables
            </h3>
            <p className="text-sm md:text-base opacity-90 mt-2">
              Discover our latest collection of premium vegetables
            </p>

            {/* price */}
            <div className="flex items-center gap-3 mt-4">
              <span className="text-2xl md:text-3xl font-bold">25% OFF</span>
              <span className="text-sm opacity-80">Use code: FRESH25</span>
            </div>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 mt-5 bg-white text-orange-600 px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition"
            >
              Explore Now →
            </Link>
          </div>
        </div>

        {/* Featured Products */}
        <Products />
      </div>

      <NewsletterSection />
    </>
  );
}
