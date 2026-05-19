"use server";

import { getTokenFn } from "@/app/Utilites/getTokenFun";
import { revalidatePath } from "next/cache";

export async function deleteReviewAction({
  reviewId,
  productId,
}: {
  reviewId: string;
  productId: string;
}) {
  try {
    // token
    const token = await getTokenFn();

    if (!token) {
      return {
        error: "Unauthorized",
      };
    }

    // delete review
    const data = await fetch(
      `https://ecommerce.routemisr.com/api/v1/reviews/${reviewId}`,
      {
        method: "DELETE",

        headers: {
          token,
        },
      },
    );

    // response
    const payload = await data.json();

    // refresh
    revalidatePath(`/ProductDetails/${productId}`);

    return payload;
  } catch (error) {
    console.log(error);
  }
}
