import Link from "next/link";
import { Search, SlidersHorizontal } from "lucide-react";

import { searchProducts } from "../Apis/search.api";
import { getAllProducts } from "../Apis/Products.api";

import { getCategories } from "../Apis/categories.api";
import { getBrands } from "../Apis/brands.api";

import SortSelect from "../_components/Search/select";
import SearchInput from "../_components/Search/search";

import SidebarFilters from "../_components/Search/SidebarFilters";
import ProductsView from "../_components/Search/ProductsView";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    sort?: string;
    q?: string;
    page?: string;
    category?: string | string[];
    brand?: string | string[];
    minPrice?: string;
    maxPrice?: string;
  }>;
}) {
  const params = await searchParams;

  const q = params.q || "";
  const page = params.page || "1";
  const sort = params.sort || "relevance";

  const currentPage = Number(page);

  // Products
  const products = q ? await searchProducts(q) : await getAllProducts();

  const categories = await getCategories();

  const brands = await getBrands();

  let filteredProducts = [...products];

  // Categories Filter
  const selectedCategories = Array.isArray(params.category)
    ? params.category
    : params.category
      ? [params.category]
      : [];

  if (selectedCategories.length > 0) {
    filteredProducts = filteredProducts.filter((product) =>
      selectedCategories.includes(product.category._id),
    );
  }
  // brand Filter
  const selectedBrands = Array.isArray(params.brand)
    ? params.brand
    : params.brand
      ? [params.brand]
      : [];

  if (selectedBrands.length > 0) {
    filteredProducts = filteredProducts.filter((product) =>
      selectedBrands.includes(product.brand._id),
    );
  }
  // Price Filter

  const minPrice = Number(params.minPrice) || 0;

  const maxPrice = Number(params.maxPrice) || Infinity;

  filteredProducts = filteredProducts.filter(
    (product) => product.price >= minPrice && product.price <= maxPrice,
  );

  // Sorting
  if (sort === "price-low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sort === "price-high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  if (sort === "rating-high") {
    filteredProducts.sort((a, b) => b.ratingsAverage - a.ratingsAverage);
  }

  if (sort === "name-asc") {
    filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
  }

  if (sort === "name-desc") {
    filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
  }

  // Pagination
  const ITEMS_PER_PAGE = 12;

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const start = (currentPage - 1) * ITEMS_PER_PAGE;

  const end = start + ITEMS_PER_PAGE;

  const currentProducts = filteredProducts.slice(start, end);

  const hasPriceFilter = params.minPrice || params.maxPrice;
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-5 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-green-600">
            Home
          </Link>

          <span>/</span>

          <span className="font-medium text-gray-800">Search Results</span>
        </div>

        {/* Search */}
        <div className="mb-10">
          <SearchInput />
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Sidebar */}
          <SidebarFilters categories={categories} brands={brands} />

          {/* Products */}
          <main className="flex-1">
            {/* Top Bar */}
            {/* Active Filters */}
            {(selectedCategories.length > 0 ||
              selectedBrands.length > 0 ||
              q ||
              hasPriceFilter) && (
                <div className="mb-6 flex flex-wrap items-center gap-3">
                  <span className="flex items-center gap-2 text-sm font-medium text-gray-500">
                    <SlidersHorizontal size={16} />
                    Active:
                  </span>

                  {/* Search */}
                  {q && (
                    <Link
                      href={{
                        pathname: "/search",
                        query: {
                          ...Object.fromEntries(
                            Object.entries(params).filter(([key]) => key !== "q"),
                          ),
                        },
                      }}
                      className="flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700"
                    >
                      {q}

                      <span className="text-lg leading-none">×</span>
                    </Link>
                  )}

                  {/* Categories */}
                  {selectedCategories.map((id) => {
                    const category = categories.find((c) => c._id === id);

                    return (
                      <Link
                        key={id}
                        href={{
                          pathname: "/search",
                          query: {
                            ...Object.fromEntries([
                              ...new URLSearchParams(params as any),
                            ]),
                            category: selectedCategories.filter(
                              (cat) => cat !== id,
                            ),
                          },
                        }}
                        className="flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700"
                      >
                        {category?.name}

                        <span className="text-lg leading-none">×</span>
                      </Link>
                    );
                  })}

                  {/* Brands */}
                  {selectedBrands.map((id) => {
                    const brand = brands.find((b) => b._id === id);

                    return (
                      <Link
                        key={id}
                        href={{
                          pathname: "/search",
                          query: {
                            ...Object.fromEntries([
                              ...new URLSearchParams(params as any),
                            ]),
                            brand: selectedBrands.filter((b) => b !== id),
                          },
                        }}
                        className="flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700"
                      >
                        {brand?.name}

                        <span className="text-lg leading-none">×</span>
                      </Link>
                    );
                  })}

                  {/* Price */}
                  {hasPriceFilter && (
                    <Link
                      href={{
                        pathname: "/search",
                        query: {
                          ...Object.fromEntries(
                            Object.entries(params).filter(
                              ([key]) => key !== "minPrice" && key !== "maxPrice",
                            ),
                          ),
                        },
                      }}
                      className="flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700"
                    >
                      {params.minPrice || 0}
                      {" - "}
                      {params.maxPrice || "∞"} EGP
                      <span className="text-lg leading-none">×</span>
                    </Link>
                  )}

                  {/* Clear */}
                  <Link
                    href="/search?q="
                    className="text-sm font-medium text-gray-500 underline hover:text-red-500"
                  >
                    Clear all
                  </Link>
                </div>
              )}
            <ProductsView currentProducts={currentProducts}>
              <SortSelect />
            </ProductsView>

            {/* Empty */}
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-3xl bg-white py-24 text-center shadow-sm">
                <div className="mb-5 rounded-full bg-gray-100 p-6">
                  <Search size={45} className="text-gray-400" />
                </div>

                <h2 className="mb-2 text-2xl font-bold text-gray-800">
                  No Products Found
                </h2>

                <p className="max-w-md text-gray-500">
                  Sorry, we couldn&apos;t find any products.
                </p>

                <Link
                  href="/search"
                  className="mt-6 rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                >
                  Clear Search
                </Link>
              </div>
            ) : (
              <>
                {/* Pagination */}
                <div className="mt-12 flex items-center justify-center gap-3">
                  {/* Prev */}
                  <Link
                    href={`/search?q=${q}&sort=${sort}&page=${currentPage - 1}`}
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition hover:border-green-500 hover:text-green-600 ${currentPage === 1 ? "pointer-events-none opacity-40" : ""
                      }`}
                  >
                    ←
                  </Link>

                  {/* Pages */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <Link
                        key={page}
                        href={`/search?q=${q}&sort=${sort}&page=${page}`}
                        className={`flex h-11 w-11 items-center justify-center rounded-xl text-sm font-semibold transition ${currentPage === page
                          ? "bg-green-600 text-white shadow-md"
                          : "border border-gray-200 bg-white text-gray-600 hover:border-green-500 hover:text-green-600"
                          }`}
                      >
                        {page}
                      </Link>
                    ),
                  )}

                  {/* Next */}
                  <Link
                    href={`/search?q=${q}&sort=${sort}&page=${currentPage + 1}`}
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition hover:border-green-500 hover:text-green-600 ${currentPage === totalPages
                      ? "pointer-events-none opacity-40"
                      : ""
                      }`}
                  >
                    →
                  </Link>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
