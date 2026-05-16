import { ProductInterface } from "../interfaces/Product.interface";

const KEY = "guestCart";

export interface GuestCartItem {
  product: ProductInterface;
  count: number;
}

export const getGuestCart = (): GuestCartItem[] => {
  if (typeof window === "undefined") return [];

  return JSON.parse(localStorage.getItem(KEY) || "[]");
};

export const addToGuestCart = (product: ProductInterface) => {
  const cart = getGuestCart();

  const existingItem = cart.find((item) => item.product._id === product._id);

  if (existingItem) {
    existingItem.count += 1;
  } else {
    cart.push({
      product,
      count: 1,
    });
  }

  localStorage.setItem(KEY, JSON.stringify(cart));
};

export const removeFromGuestCart = (productId: string) => {
  const cart = getGuestCart().filter((item) => item.product._id !== productId);

  localStorage.setItem(KEY, JSON.stringify(cart));
};

export const updateGuestCart = (productId: string, count: number) => {
  const cart = getGuestCart().map((item) =>
    item.product._id === productId ? { ...item, count } : item,
  );

  localStorage.setItem(KEY, JSON.stringify(cart));
};

export const clearGuestCart = () => {
  localStorage.removeItem(KEY);
};
