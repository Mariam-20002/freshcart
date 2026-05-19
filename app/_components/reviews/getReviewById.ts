import { ReviewInterface } from "../../interfaces/review.interface";

export async function getReviewById(
  reviewId: string,
): Promise<ReviewInterface | null> {
  try {
    const res = await fetch(
      `${process.env.API}reviews/${reviewId}`,
      {
        cache: "no-store",

        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch review");
    }

    const data = await res.json();

    return data.data || null;
  } catch (error) {
    console.log(error);

    return null;
  }
}