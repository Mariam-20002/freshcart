import React from "react";

import { getProducts } from "@/app/Apis/Products.api";

import ProductItem from "../ProductItem/ProductItem";
import { getWishlist } from "@/app/Apis/wishList/Wishlist.api";

export default async function Products() {
  const data = await getProducts();

  let wishlistIds: string[] = [];

  try {
    // get wishlist
    const wishlist = await getWishlist();

    // extract wishlist ids
    wishlistIds =
      wishlist?.data?.map((item: any) => item._id) || [];
  } catch (error) {
    console.log("Guest user - no wishlist");
  }

  // mark products
  const productsWithWishlist =
    data?.map((product) => ({
      ...product,
      isWishlisted: wishlistIds.includes(product._id),
    })) || [];

  return (
    <>
      <div className="mb-6 flex items-center gap-3">
        <span className="h-6 w-1 rounded-full bg-green-500"></span>

        <h2 className="text-xl font-bold text-gray-800 md:text-2xl">
          Featured <span className="text-green-600">Products</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-5 py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {productsWithWishlist.map((prod) => (
          <ProductItem key={prod._id} prod={prod} />
        ))}
      </div>
    </>
  );
}

