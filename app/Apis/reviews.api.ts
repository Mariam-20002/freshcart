export async function getProductReviews(productId: string) {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${productId}/reviews`
    );

    if (!res.ok) throw new Error("Failed to fetch reviews");

    const data = await res.json();

    return data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}