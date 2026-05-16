import { ProductInterface } from "@/app/interfaces/Product.interface";
import Link from "next/link";
import {
  FaRegHeart,
  FaRegEye,
  FaSyncAlt,
  FaPlus,
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
} from "react-icons/fa";
import Image from "next/image";
import ButtonCom from "../ButtonCom";
import ButtonWish from "../ButtonWish";

interface pageProps {
  prod: ProductInterface;
}

export default function ProductItem({ prod }: pageProps) {
  const rating = prod.ratingsAverage || 4;

  return (
    <div className="group p-4 w-full  rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out relative bg-white">
      {/* Image + Badge */}
      <div className="relative">
        {/* Badge */}
        {prod.priceAfterDiscount && (
          <span className="absolute top-0 left-0 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
            -
            {Math.round(
              ((prod.price - prod.priceAfterDiscount) / prod.price) * 100,
            )}
            %
          </span>
        )}

        {/* Image */}
        <div className="h-[240px] w-full flex items-center justify-center bg-white rounded-md">
          <Image
            src={prod.imageCover}
            alt={prod.title}
            width={170}
            height={170}
            className="object-contain"
          />
        </div>

        {/* Icons */}
        <div className="absolute top-0 right-0 flex flex-col gap-2 z-10">
          <ButtonWish
            id={prod._id}
            product={prod}
            isInitiallyWishlisted={prod.isWishlisted}
            cls="bg-white w-8 h-8 flex items-center justify-center rounded-full shadow text-gray-600 hover:text-red-500 transition cursor-pointer"
          >
            <FaRegHeart size={16} />
          </ButtonWish>

          <button className="bg-white w-8 h-8 flex items-center justify-center rounded-full shadow text-gray-600 hover:text-green-600 transition">
            <FaSyncAlt size={16} />
          </button>

          <Link
            href={`/ProductDetails/${prod._id}`}
            className="bg-white w-8 h-8 flex items-center justify-center rounded-full shadow text-gray-600 hover:text-green-600 transition"
          >
            <FaRegEye size={16} />
          </Link>
        </div>
      </div>
      {/* Info */}
      <div className="mt-4 space-y-1">
        <div className="mt-3 space-y-1">
          <p className="text-[12px] text-gray-400">{prod.category.name}</p>

          <Link href={`/ProductDetails/${prod._id}`}>
            <p className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug cursor-pointer hover:text-green-600 transition">
              {prod.title}
            </p>
          </Link>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 text-yellow-400 text-[16px] mt-1">
          {Array.from({ length: 5 }).map((_, i) => {
            if (rating >= i + 1) {
              return <FaStar key={i} />;
            } else if (rating >= i + 0.5) {
              return <FaStarHalfAlt key={i} />;
            } else {
              return <FaRegStar key={i} />;
            }
          })}

          <span className="text-gray-500 text-xs ml-1">
            {rating.toFixed(1)} ({prod.ratingsQuantity || 0})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mt-2">
          <div>
            {prod.priceAfterDiscount ? (
              <div className="flex gap-2 items-center">
                <p className="text-green-600 font-bold">
                  {prod.priceAfterDiscount} EGP
                </p>

                <p className="text-gray-400 text-sm line-through">
                  {prod.price}
                </p>
              </div>
            ) : (
              <p className="font-bold text-gray-800">{prod.price} EGP</p>
            )}
          </div>

          <ButtonCom
            id={prod._id}
            product={prod}
            cls="bg-green-600 text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-green-700 transition shadow-sm cursor-pointer"
          >
            <FaPlus size={14} />
          </ButtonCom>
        </div>
      </div>
    </div>
  );
}
