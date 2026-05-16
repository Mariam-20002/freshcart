// 🔹 Interfaces
export interface BrandInterface {
  _id: string;
  name: string;
  image: string;
}

//  Get All Brands
export async function getBrands(): Promise<BrandInterface[]> {
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands", {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch brands");
    }

    const data = await res.json();

    return data?.data || [];
  } catch (error) {
    console.error("Brands Error:", error);
    return [];
  }
}

//  Get  Brand by ID
export async function getBrandById(id: string): Promise<BrandInterface | null> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/brands/${id}`,
      {
        next: { revalidate: 60 },
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch brand");
    }

    const data = await res.json();

    return data?.data || null;
  } catch (error) {
    console.error("Brand Error:", error);
    return null;
  }
}
