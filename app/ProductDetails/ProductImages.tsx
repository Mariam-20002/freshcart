"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductImages({
  imageCover,
  images,
  title,
}: {
  imageCover: string;
  images: string[];
  title: string;
}) {
  const [selectedImage, setSelectedImage] = useState(imageCover);

  return (
    <div className="md:w-1/4 w-full border rounded-lg overflow-hidden p-4">
      {/* big */}
      <Image
        src={selectedImage}
        width={400}
        height={400}
        className="w-full object-contain"
        alt={title}
      />

      {/* small */}
      <div className="flex gap-3 mt-4 overflow-x-auto scrollbar-hide">
        {[imageCover, ...images].map((img) => (
          <Image
            key={img}
            src={img}
            width={70}
            height={70}
            alt="pic"
            onClick={() => setSelectedImage(img)}
            className={`cursor-pointer border rounded-md p-1 transition ${
              selectedImage === img
                ? "border-green-500"
                : "hover:border-green-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
