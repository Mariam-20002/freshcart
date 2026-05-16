"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumb() {
  const pathname = usePathname();

  const pathParts = pathname.split("/").filter(Boolean);

  return (
    <div className="text-sm text-white/90 flex items-center gap-2 py-3">
      <Link href="/" >
        Home
      </Link>

      {pathParts.map((part, index) => {
        const href = "/" + pathParts.slice(0, index + 1).join("/");

        return (
          <span key={index} className="flex items-center gap-2">
            <span>/</span>
            <Link href={href} className="capitalize">
              {decodeURIComponent(part)}
            </Link>
          </span>
        );
      })}
    </div>
  );
}