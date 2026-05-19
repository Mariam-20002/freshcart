import { getSingleProducts } from "@/app/Apis/singleProduct.api";
import { getProductReviews } from "@/app/_components/reviews/reviews.api";
import ProductItem from "@/app/_components/ProductItem/ProductItem";
import type { ProductInterface } from "@/app/interfaces/Product.interface";

import {
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
  FaShoppingCart,
  FaBolt,
  FaRegHeart,
  FaShareAlt,
  FaTruck,
  FaUndo,
  FaShieldAlt,
} from "react-icons/fa";
import ProductImages from "../ProductImages";
import Quantity from "./Quantity";
import Breadcrumb from "./Breadcrumb";
import ProductTabs from "./ProductTabs";
import ButtonCom from "@/app/_components/ButtonCom";
import ButtonWish from "@/app/_components/ButtonWish";
import { getWishlist } from "@/app/Apis/wishList/Wishlist.api";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const data = await getSingleProducts(id);

  const reviews = await getProductReviews(id);
  console.log("REVIEWS DATA:", reviews);

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?category=${data.category._id}`,
  );

  const relatedData = await res.json();

  const relatedProducts: ProductInterface[] = relatedData.data.filter(
    (item: ProductInterface) => item._id !== data._id,
  );

  const wishlist = await getWishlist();

  const wishlistIds = wishlist?.data?.map((item) => item._id) || [];

  const isWishlisted = wishlistIds.includes(data._id);
  return (
    <>
      <Breadcrumb data={data} />

      <div className="flex flex-col md:flex-row items-start gap-8 p-6">
        {/*  LEFT */}
        <ProductImages
          imageCover={data.imageCover}
          images={data.images}
          title={data.title}
        />

        {/*  RIGHT */}
        <div className="md:w-3/4 w-full border rounded-lg p-6 space-y-4 sticky top-24 self-start">
          {/*  badges */}
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">
              {data.category.name}
            </span>

            <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">
              {data.brand.name}
            </span>
          </div>
          {/*  title */}
          <h1 className="text-2xl font-semibold text-gray-800">{data.title}</h1>
          {/*  Rating */}
          <div className="flex items-center gap-1 text-yellow-400 text-lg">
            {Array.from({ length: 5 }).map((_, i) => {
              if (data.ratingsAverage >= i + 1) {
                return <FaStar key={i} />;
              } else if (data.ratingsAverage >= i + 0.5) {
                return <FaStarHalfAlt key={i} />;
              } else {
                return <FaRegStar key={i} />;
              }
            })}

            <span className="text-gray-500 text-sm ml-2">
              {data.ratingsAverage.toFixed(1)} ({data.ratingsQuantity || 0})
            </span>
          </div>
          {/*  Price */}
          <div className="flex items-center gap-3 mt-2">
            <h2 className="text-2xl font-bold">
              {data.priceAfterDiscount || data.price} EGP
            </h2>

            {data.priceAfterDiscount && (
              <>
                <span className="line-through text-gray-400">
                  {data.price} EGP
                </span>

                <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                  Save{" "}
                  {Math.round(
                    ((data.price - data.priceAfterDiscount) / data.price) * 100,
                  )}
                  %
                </span>
              </>
            )}
          </div>
          {/*  stock */}
          <div className="flex items-center gap-2 bg-green-50 text-green-600 text-sm px-3 py-1 rounded-full w-fit">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            In Stock
          </div>
          <div className="w-full h-[1px] bg-gray-200"></div>
          {/*  description */}
          <p className="text-gray-600 text-sm leading-relaxed">
            {data.description}
          </p>
          {/*  Quantity  +  Total Price*/}
          <div className="mt-4">
            <p className="text-sm mb-2">Quantity</p>

            <Quantity
              stock={data.quantity}
              price={data.priceAfterDiscount || data.price}
            />
          </div>

          {/*  Buttons */}
          <div className="space-y-3 mt-3  ">
            <div className="flex flex-col sm:flex-row gap-4">
              <ButtonCom
                id={id}
                product={data}
                cls="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition shadow-sm cursor-pointer"
              >
                <>
                  <FaShoppingCart />
                  Add to Cart
                </>
              </ButtonCom>

              <button className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition shadow-sm cursor-pointer">
                <FaBolt />
                Buy Now
              </button>
            </div>

            <div className="flex gap-4">
              {/* Wishlist */}
              <ButtonWish
                id={id}
                product={data}
                fullStyle={true}
                isInitiallyWishlisted={isWishlisted}
                cls="flex items-center justify-center gap-2 border border-gray-300 rounded-lg w-full py-3 text-gray-700 hover:text-green-500 hover:border-green-500 transition cursor-pointer"
              >
                <>
                  <FaRegHeart />
                  Add to Wishlist
                </>
              </ButtonWish>

              {/* Share */}
              <button className="border rounded-lg w-[60px] flex items-center justify-center hover:bg-gray-50 transition cursor-pointer">
                <FaShareAlt />
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-4 sm:flex-row sm:justify-between sm:items-center">
            {/*  Free Delivery */}
            <div className="flex items-center gap-3">
              <div className="bg-green-100 text-green-600 p-3 rounded-full">
                <FaTruck />
              </div>
              <div>
                <p className="font-medium text-sm text-gray-800">
                  Free Delivery
                </p>
                <p className="text-xs text-gray-400">Orders over $50</p>
              </div>
            </div>

            {/*  Return */}
            <div className="flex items-center gap-3">
              <div className="bg-green-100 text-green-600 p-3 rounded-full">
                <FaUndo />
              </div>
              <div>
                <p className="font-medium text-sm text-gray-800">
                  30 Days Return
                </p>
                <p className="text-xs text-gray-400">Money back</p>
              </div>
            </div>

            {/*  Payment */}
            <div className="flex items-center gap-3">
              <div className="bg-green-100 text-green-600 p-3 rounded-full">
                <FaShieldAlt />
              </div>
              <div>
                <p className="font-medium text-sm text-gray-800">
                  Secure Payment
                </p>
                <p className="text-xs text-gray-400">100% Protected</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <ProductTabs data={data} reviews={reviews} />

      {/* You May Also Like */}
      <div className="mt-10 px-6">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <span className="w-1 h-6 bg-green-600 rounded"></span>
          You May Also <span className="text-green-600">Like</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {relatedProducts.slice(0, 5).map((prod: ProductInterface) => (
            <ProductItem key={prod._id} prod={prod} />
          ))}
        </div>
      </div>
    </>
  );
}
