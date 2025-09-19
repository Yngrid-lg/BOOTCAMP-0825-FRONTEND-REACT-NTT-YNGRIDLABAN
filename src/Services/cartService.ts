import type { CartItem } from "../app/domain/cartItem";

const STORAGE_KEY = "carrito";

export const cartService = {
  getCart: (): CartItem[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  saveCart: (cart: CartItem[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  },

  clearCart: () => {
    localStorage.removeItem(STORAGE_KEY);
  },

  getTotalCount: (cart: CartItem[]): number => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  },

  getTotalPrice: (cart: CartItem[]): number => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },
};
