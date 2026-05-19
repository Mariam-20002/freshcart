"use server";

import { getTokenFn } from "@/app/Utilites/getTokenFun";
import { revalidatePath } from "next/cache";

export async function updateReviewAction({
  reviewId,
  productId,
  review,
  rating,
}: {
  reviewId: string;
  productId: string;
  review: string;
  rating: number;
}) {
  try {
    // get token
    const token = await getTokenFn();

    // check token
    if (!token) {
      return {
        error: "Unauthorized",
      };
    }

    // update review
    const data = await fetch(
      `https://ecommerce.routemisr.com/api/v1/reviews/${reviewId}`,
      {
        method: "PUT",

        headers: {
          token,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          review,
          rating,
        }),
      },
    );

    // response
    const payload = await data.json();

    // refresh page
    revalidatePath(`/ProductDetails/${productId}`);

    return payload;
  } catch (error) {
    console.log(error);
  }
}
