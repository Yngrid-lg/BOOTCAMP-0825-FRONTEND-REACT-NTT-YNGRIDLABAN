import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../CartContext";
import type { CartItem } from "../../app/domain/cartItem";
import type { Product } from "../../app/domain/product";
import { StorageKeys } from "../../app/shared/constants/StorageKey";
import { AuthContext } from "../AuthContext";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem(StorageKeys.Cart);
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      setCart([]);
      localStorage.removeItem(StorageKeys.Cart);
    }
  }, [user]);

  const addItem = (product: Product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const increaseQuantity = (id: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem(StorageKeys.Cart);
  };

  useEffect(() => {
    localStorage.setItem(StorageKeys.Cart, JSON.stringify(cart));
  }, [cart]);


  return (
    <CartContext.Provider
      value={{ cart, addItem, increaseQuantity, decreaseQuantity, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
