import { ProductInterface } from "../interfaces/Product.interface";

const KEY = "guestWishlist";

// get
export const getGuestWishlist = (): ProductInterface[] => {
  if (typeof window === "undefined") return [];

  return JSON.parse(localStorage.getItem(KEY) || "[]");
};

// add
export const addToGuestWishlist = (product: ProductInterface) => {
  const wishlist = getGuestWishlist();

  const exists = wishlist.find((item) => item._id === product._id);

  if (!exists) {
    wishlist.push(product);

    localStorage.setItem(KEY, JSON.stringify(wishlist));
  }
};

// remove
export const removeFromGuestWishlist = (productId: string) => {
  const wishlist = getGuestWishlist().filter((item) => item._id !== productId);

  localStorage.setItem(KEY, JSON.stringify(wishlist));
};
