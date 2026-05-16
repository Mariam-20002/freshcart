// 🔹 Interfaces
export interface CategoryInterface {
  _id: string;
  name: string;
  image: string;
}

export interface SubCategoryInterface {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

//  Get All Categories
export async function getCategories(): Promise<CategoryInterface[]> {
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/categories",
      {
        next: { revalidate: 60 },
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data = await res.json();

    return data?.data || [];
  } catch (error) {
    console.error("Categories Error:", error);
    return [];
  }
}

//  Get SubCategories by Category ID
export async function getSubCategories(
  categoryId: string,
): Promise<SubCategoryInterface[]> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`,
      {
        next: { revalidate: 60 },
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch subcategories");
    }

    const data = await res.json();

    return data?.data || [];
  } catch (error) {
    console.error("SubCategories Error:", error);
    return [];
  }
}

//  Get Single Category by ID
export async function getCategoryById(
  id: string,
): Promise<CategoryInterface | null> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}`,
      {
        next: { revalidate: 60 },
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch category");
    }

    const data = await res.json();

    return data?.data || null;
  } catch (error) {
    console.error("Category Error:", error);
    return null;
  }
}
