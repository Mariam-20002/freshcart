"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type SlideType = {
  img: string;
  title: string;
  desc: string;
  btn1: string;
  btn2: string;
  link1?: string;
  link2?: string;
};

export default function MySlider({
  slidesPerView,
  pageList,
}: {
  slidesPerView: number;
  pageList: SlideType[];
}) {
  return (
    <div className="w-full relative">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        loop
        slidesPerView={slidesPerView}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} bg-white! w-3! h-3! rounded-2xl!"></span>`;
          },
          bulletActiveClass: "bg-white! opacity-100! w-10! rounded-3xl!",
        }}
      >
        {pageList.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[400px]">
              {/* Image */}
              <Image
                src={item.img}
                fill
                className="object-cover"
                alt="slider"
              />

              {/* layer*/}
              <div className="absolute inset-0 bg-gradient-to-r from-[#00C950]/90 to-[#05DF72]/50"></div>

              <div
                className={`absolute inset-0 flex items-center ${
                  index === 0 ? "slide-up" : ""
                }`}
              >
                <div className="max-w-[1536px] mx-auto px-8 md:px-12 lg:px-16 w-full">
                  <div className="max-w-[700px] text-white space-y-4 ml-4 md:ml-8">
                    <h2 className="text-xl md:text-[30px] font-bold leading-[36px] max-w-[380px]">
                      {item.title}
                    </h2>

                    <p className="text-sm md:text-base font-medium leading-6 opacity-90 max-w-[500px]">
                      {item.desc}
                    </p>

                    <div className="flex gap-4">
                      {/* Primary */}
                      <Link
                        href="/products"
                        className="bg-white text-green-600 h-11 px-6 rounded-md flex items-center justify-center font-medium hover:bg-gray-100 transition"
                      >
                        {item.btn1}
                      </Link>

                      {/* Secondary */}
                      <Link
                        href="/deals"
                        className="h-11 px-6 rounded-md flex items-center justify-center font-medium border-2 border-white/50 text-white hover:bg-white hover:text-green-600 transition"
                      >
                        {item.btn2}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* arrows */}
      <div className="custom-prev hidden md:block absolute left-5 top-1/2 -translate-y-1/2 z-10 cursor-pointer">
        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition">
          <ChevronLeft className="text-[#00C950] w-5 h-5" />
        </div>
      </div>

      <div className="custom-next hidden md:block absolute right-5 top-1/2 -translate-y-1/2 z-10 cursor-pointer">
        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition">
          <ChevronRight className="text-[#00C950] w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
