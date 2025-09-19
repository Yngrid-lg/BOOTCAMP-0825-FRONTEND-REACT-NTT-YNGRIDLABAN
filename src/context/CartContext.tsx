
import React, { createContext, useState, useEffect, useContext } from "react";
import type { ReactNode } from "react";
import type { CartItem } from "../app/domain/cartItem";
import type { Product } from "../app/domain/product";
import { AuthContext } from "./AuthContext";
import { StorageKeys } from "../app/shared/constants/StorageKey";

interface CartContextType {
  cart: CartItem[];
  addItem: (product: Product, onStockMax?: () => void) => boolean;
  increaseQuantity: (id: number, onStockMax?: () => void) => boolean;
  decreaseQuantity: (id: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  addItem: () => false,
  increaseQuantity: () => false,
  decreaseQuantity: () => { },
  removeItem: () => { },
  clearCart: () => { },
});

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useContext(AuthContext);

  const [cart, setCart] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem(StorageKeys.Cart);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(StorageKeys.Cart, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (!user) {
      setCart([]);
      localStorage.removeItem(StorageKeys.Cart);
    }
  }, [user]);

  const addItem = (product: Product, onStockMax?: () => void): boolean => {
    let reachedMax = false;
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        if (exists.quantity >= product.stock) {
          reachedMax = true;
          if (onStockMax) onStockMax();
          return prev;
        }
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    return reachedMax;
  };

  const increaseQuantity = (id: number, onStockMax?: () => void): boolean => {
    let reachedMax = false;
    setCart(prev =>
      prev.map(item => {
        if (item.id === id) {
          if (item.quantity >= item.stock) {
            reachedMax = true;
            if (onStockMax) onStockMax();
            return item;
          }
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    );
    return reachedMax;
  };

  const decreaseQuantity = (id: number) => {
    setCart(prev =>
      prev
        .map(item =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem(StorageKeys.Cart);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
