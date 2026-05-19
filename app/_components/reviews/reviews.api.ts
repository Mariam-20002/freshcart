import { ReviewInterface } from "../../interfaces/review.interface";

export async function getProductReviews(
  productId: string,
): Promise<ReviewInterface[]> {
  try {
    const res = await fetch(`${process.env.API}products/${productId}/reviews`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch reviews");
    }

    const data = await res.json();

    return data.data || [];
  } catch (error) {
    console.log(error);

    return [];
  }
}
