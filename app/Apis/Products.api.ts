import { ProductInterface } from "../interfaces/Product.interface";

export async function getProducts(): Promise<ProductInterface[]> {
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/products");

    if (!res.ok) throw new Error("Failed to fetch products");

    const data = await res.json();

    return data?.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getProductsBySubCategory(subcategoryId: string) {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?subcategory=${subcategoryId}`,
    );

    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getSubCategoryById(id: string) {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/subcategories/${id}`,
    );

    const data = await res.json();
    return data?.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getProductsByCategory(categoryId: string) {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`,
      {
        next: { revalidate: 60 },
      },
    );

    if (!res.ok) throw new Error("Failed");

    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getProductsByBrand(brandId: string) {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`,
      {
        next: { revalidate: 60 },
      },
    );

    if (!res.ok) throw new Error("Failed to fetch products by brand");

    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    console.error("Products by Brand Error:", error);
    return [];
  }
}

export async function getAllProducts() {
  try {
    let allProducts = [];

    const firstRes = await fetch(
      "https://ecommerce.routemisr.com/api/v1/products?page=1&limit=40",
      {
        next: { revalidate: 60 },
      },
    );

    const firstData = await firstRes.json();

    allProducts = firstData.data;

    const totalPages = firstData.metadata.numberOfPages;

    for (let page = 2; page <= totalPages; page++) {
      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/products?page=${page}&limit=40`,
        {
          next: { revalidate: 60 },
        },
      );

      const data = await res.json();

      allProducts = [...allProducts, ...data.data];
    }

    return allProducts;
  } catch (error) {
    console.error(error);
    return [];
  }
}
