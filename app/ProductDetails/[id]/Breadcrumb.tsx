import Link from "next/link";

type Product = {
  title: string;
  category?: {
    name: string;
  };
  subcategory?: {
    name: string;
  }[];
};

export default function Breadcrumb({ data }: { data: Product }) {
  return (
    <div className="text-sm text-gray-500 mt-6 mb-4 px-4 flex items-center gap-2 flex-wrap">
      <Link href="/" className="hover:text-green-600">
        Home
      </Link>

      <span>›</span>

      <span className="hover:text-green-600 cursor-pointer">
        {data.category?.name}
      </span>

      {/* subcategory */}
      {data.subcategory?.[0]?.name && (
        <>
          <span>›</span>
          <span className="hover:text-green-600 cursor-pointer">
            {data.subcategory[0].name}
          </span>
        </>
      )}

      <span>›</span>

      <span className="text-gray-800 font-medium">{data.title}</span>
    </div>
  );
}
