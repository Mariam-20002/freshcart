import {
  getProducts,
  getProductsBySubCategory,
  getSubCategoryById,
  getProductsByCategory,
} from "@/app/Apis/Products.api";
import ProductItem from "../_components/ProductItem/ProductItem";
import Link from "next/link";
import { FaFolderOpen } from "react-icons/fa6";
import { getCategoryById } from "@/app/Apis/categories.api";
import type { ProductInterface } from "../interfaces/Product.interface";
export default async function Products({
  searchParams,
}: {
  searchParams: Promise<{ subcategory?: string; category?: string }>;
}) {
  const { subcategory, category } = await searchParams;

  let data = [];
  let subCategoryData = null;
  let categoryData = null;

  if (subcategory) {
    data = await getProductsBySubCategory(subcategory);
    subCategoryData = await getSubCategoryById(subcategory);
  } else if (category) {
    data = await getProductsByCategory(category);
    categoryData = await getCategoryById(category);
  } else {
    data = await getProducts();
  }
  const title = subCategoryData?.name || categoryData?.name || "All Products";

  return (
    <>
      {/*  Hero Section */}
      <div className="w-full bg-gradient-to-r from-green-600 to-green-400 py-16 text-white">
        <div className="container mx-auto px-6">
          {/*  Breadcrumb */}
          <p className="text-sm opacity-90 mb-3">
            <Link href="/">Home</Link> <span className="opacity-70">/</span>{" "}
            <Link href="/categories">Categories</Link>{" "}
            <span className="opacity-70">/</span>{" "}
            <span className="font-medium">
              {title === "All Products" ? "Products" : title}
            </span>
          </p>

          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <FaFolderOpen size={35} />
            </div>

            <div>
              <h1 className="text-4xl font-bold leading-tight">{title}</h1>

              <p className="text-base opacity-90 mt-1">
                Browse {title === "All Products" ? "our products" : title}{" "}
                collection
              </p>
            </div>
          </div>
        </div>
      </div>

      {/*  Content */}
      <div className="container mx-auto px-6 py-10">
        {/*  Active Filter */}
        {(subcategory || category) && (
          <div className="mb-6 flex items-center gap-3 flex-wrap">
            <span className="text-gray-600">Active Filters:</span>

            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              {title}
            </span>

            <Link
              href="/products"
              className="text-sm text-gray-500 hover:text-green-600 underline"
            >
              Clear all
            </Link>
          </div>
        )}

        {/* Count */}
        <p className="text-gray-500 mb-6">Showing {data.length} products</p>

        {/* Products */}
        {data.length === 0 ? (
          <p className="text-center text-gray-500 py-20">No products found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {data.map((prod: ProductInterface) => (
              <ProductItem key={prod._id} prod={prod} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
