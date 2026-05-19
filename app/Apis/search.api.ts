export async function searchProducts(keyword: string) {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?keyword=${keyword}`,
      {
        next: { revalidate: 60 },
      },
    );

    if (!res.ok) throw new Error("Failed to search products");

    const data = await res.json();

    return data?.data || [];
  } catch (error) {
    console.error("Search Products Error:", error);
    return [];
  }
}
