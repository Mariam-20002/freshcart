"use server";

import { getTokenFn } from "@/app/Utilites/getTokenFun";
import { revalidatePath } from "next/cache";

export async function createReviewAction({
  productId,
  review,
  rating,
}: {
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

    // create review
    const res = await fetch(`${process.env.API}products/${productId}/reviews`, {
      method: "POST",

      headers: {
        token,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        review,
        rating,
      }),
    });

    const data = await res.json();

    // revalidate
    revalidatePath(`/ProductDetails/${productId}`);

    return data;
  } catch (error) {
    console.log(error);
  }
}
