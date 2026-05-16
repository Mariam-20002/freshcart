import { getCategories } from "@/app/Apis/categories.api";
import Container from "@/components/ui/Container";
import Image from "next/image";
import Link from "next/link";
import { IoLayers } from "react-icons/io5";
import Breadcrumb from "@/components/ui/Breadcrumb";
export default async function CategoriesPage() {
  const data = await getCategories();

  return (
    <>
      <div className="w-full bg-gradient-to-r from-[#16A34A] via-[#22C55E] to-[#4ADE80] py-16">
        <div className="max-w-[1536px] mx-auto px-6 text-white">
          <Breadcrumb />

          <div className="flex items-center gap-4 mt-2">
            <div className="bg-white/20 p-3 rounded-xl text-xl">
              <IoLayers size={24} />
            </div>

            <div>
              <h1 className="text-4xl font-bold">All Categories</h1>
              <p className="text-base opacity-90 mt-1">
                Browse our wide range of product categories
              </p>
            </div>
          </div>
        </div>
      </div>

      <Container>
        <section className="py-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {data.map((cat) => (
              <Link
                key={cat._id}
                href={`/products?category=${cat._id}`}
                className="group bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 transition duration-300 text-center"
              >
                {/* Image */}
                <div className="w-full aspect-square rounded-xl flex items-center justify-center overflow-hidden mb-4">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    width={200}
                    height={200}
                    className="object-contain group-hover:scale-105 transition duration-300"
                  />
                </div>

                {/* Title */}
                <p className="text-base font-semibold text-gray-800 group-hover:text-green-600 transition">
                  {cat.name}
                </p>

                <p className="text-sm text-green-600 mt-1 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition duration-300">
                  View Subcategories →
                </p>
              </Link>
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}
