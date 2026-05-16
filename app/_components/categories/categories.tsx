import {getCategories,type CategoryInterface,} from "@/app/Apis/categories.api";
import Image from "next/image";
import Link from "next/link";

export default async function Categories() {
  const data = await getCategories();

  return (
    <>
      <section>
        {/* Title */}
        <div className="flex items-center gap-3 mb-6">
          <span className="w-1 h-6 bg-green-500 rounded-full"></span>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
            Shop By <span className="text-green-600">Category</span>
          </h2>
          <Link
            href="/categories"
            className="ml-auto text-green-600 text-sm font-medium flex items-center gap-1"
          >
            View All Categories →
          </Link>
        </div>
      </section>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {data.map((cat) => (
          <Link href={`/categories/${cat._id}`} key={cat._id}>
            <CatItem cat={cat} />
          </Link>
        ))}
      </div>
    </>
  );
}

function CatItem({ cat }: { cat: CategoryInterface }) {
  return (
    <div className="text-center border border-border-color p-4 rounded-xl shadow-md hover:-translate-y-1 transition duration-300 cursor-pointer">
      <Image
        src={cat.image}
        width={100}
        height={100}
        className="rounded-full w-20 h-20 object-cover mx-auto mb-3"
        alt={cat.name}
      />

      <p className="text-sm font-medium text-gray-700">{cat.name}</p>
    </div>
  );
}
