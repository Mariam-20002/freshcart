import { ProductInterface } from "../interfaces/Product.interface";

export async function getSingleProducts(id: string): Promise<ProductInterface> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`,
    );

    if (!res.ok) throw new Error("Failed to fetch products");

    const data = await res.json();

    return data?.data;
  } catch (error) {
    throw new Error("Something went wrong");
  }
}
