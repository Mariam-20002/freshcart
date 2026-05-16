import { getSubCategories, getCategoryById } from "@/app/Apis/categories.api";
import Container from "@/components/ui/Container";
import Link from "next/link";
import { IoFolderOpenOutline } from "react-icons/io5";
import Image from "next/image";
export default async function CategoryDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [subCategories, category] = await Promise.all([
    getSubCategories(id),
    getCategoryById(id),
  ]);

  console.log("CATEGORY:", category);
  const categoryName = category?.name || "Category";

  return (
    <>
      {/*  Hero Section */}
      <div className="w-full bg-gradient-to-r from-[#16A34A] via-[#22C55E] to-[#4ADE80] py-16">
        <div className="max-w-[1536px] mx-auto px-6 text-white">
          {/* Breadcrumb */}
          <p className="text-sm mb-3 opacity-90">
            <Link href="/">Home</Link> <span className="opacity-70">/</span>{" "}
            <Link href="/categories">Categories</Link>{" "}
            <span className="opacity-70">/</span>{" "}
            <span className="font-medium text-white">{categoryName}</span>
          </p>

          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-2 rounded-xl w-16 h-16 flex items-center justify-center overflow-hidden">
              {category?.image ? (
                <Image
                  src={category.image}
                  alt={category.name}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full rounded-lg"
                />
              ) : (
                <span className="text-sm">No Image</span>
              )}
            </div>

            <div>
              <h1 className="text-4xl font-bold">{categoryName}</h1>

              <p className="text-base opacity-90 mt-1">
                Choose a subcategory to browse products
              </p>
            </div>
          </div>
        </div>
      </div>

      <Container>
        <section className="py-12">
          {/* Back */}
          <Link
            href="/categories"
            className="text-sm text-gray-600 hover:text-green-600 flex items-center gap-2 mb-6"
          >
            ← Back to Categories
          </Link>

          {/* Title */}
          <h2 className="text-xl font-bold mb-8">
            {subCategories.length} Subcategories in {categoryName}
          </h2>

          {/* Empty */}
          {subCategories.length === 0 ? (
            <p className="text-gray-500 text-center">No subcategories found</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {subCategories.map((sub) => (
                <Link
                  key={sub._id}
                  href={`/products?subcategory=${sub._id}`}
                  className="group border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition duration-300 bg-white"
                >
                  <div className="w-12 h-12 bg-green-100 text-green-600 flex items-center justify-center rounded-xl mb-4 group-hover:scale-110 transition">
                    <IoFolderOpenOutline size={22} />
                  </div>

                  {/* Title */}
                  <p className="text-base font-semibold text-gray-800 group-hover:text-green-600 transition">
                    {sub.name}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </section>
      </Container>
    </>
  );
}
