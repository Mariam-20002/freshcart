import { getProductsByBrand } from "../../Apis/Products.api";
import { getBrands } from "@/app/Apis/brands.api";
import Container from "@/components/ui/Container";
import Link from "next/link";
import Image from "next/image";
import ProductItem from "@/app/_components/ProductItem/ProductItem";
import type { ProductInterface } from "@/app/interfaces/Product.interface";

export default async function BrandDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const brands = await getBrands();
  const brand = brands.find((b) => b._id === id);

  const products: ProductInterface[] = await getProductsByBrand(id);

  const brandName = brand?.name || "Brand";

  return (
    <>
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-[#7C3AED] via-[#9333EA] to-[#A855F7] py-16">
        <div className="max-w-[1536px] mx-auto px-6 text-white">
          {/* Breadcrumb */}
          <p className="text-sm mb-3 opacity-90">
            <Link href="/">Home</Link> <span className="opacity-70">/</span>{" "}
            <Link href="/brands">Brands</Link>{" "}
            <span className="opacity-70">/</span>{" "}
            <span className="font-medium text-white">{brandName}</span>
          </p>

          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-2 rounded-xl w-16 h-16 flex items-center justify-center overflow-hidden">
              {brand?.image ? (
                <Image
                  src={brand.image}
                  alt={brand.name}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full rounded-lg"
                />
              ) : (
                <span className="text-sm">No Image</span>
              )}
            </div>

            <div>
              <h1 className="text-4xl font-bold">{brandName}</h1>

              <p className="text-base opacity-90 mt-1">
                Browse products from this brand
              </p>
            </div>
          </div>
        </div>
      </div>

      <Container>
        <section className="py-12">
          {/* Back */}
          <Link
            href="/brands"
            className="text-sm text-gray-600 hover:text-purple-600 flex items-center gap-2 mb-6"
          >
            ← Back to Brands
          </Link>

          {/* Title */}
          <h2 className="text-xl font-bold mb-8">
            {products.length} Products in {brandName}
          </h2>

          {/* Empty */}
          {products.length === 0 ? (
            <p className="text-gray-500 text-center">No products found</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
              {products.map((product: ProductInterface) => (
                <ProductItem key={product._id} prod={product} />
              ))}
            </div>
          )}
        </section>
      </Container>
    </>
  );
}
