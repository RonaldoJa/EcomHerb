"use client";

import { createContext, useState, useCallback, ReactNode } from "react";
import type { ICartContext, ICartItem, IProduct } from "@/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { CART_STORAGE_KEY } from "@/lib/constants";

export const CartContext = createContext<ICartContext | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useLocalStorage<ICartItem[]>(CART_STORAGE_KEY, []);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = useCallback(
    (product: IProduct) => {
      setItems((prev) => {
        const existing = prev.find((item) => item._id === product._id);
        if (existing) {
          return prev.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prev, { ...product, quantity: 1 }];
      });
      setIsOpen(true);
    },
    [setItems]
  );

  const removeFromCart = useCallback(
    (productId: string) => {
      setItems((prev) => prev.filter((item) => item._id !== productId));
    },
    [setItems]
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        setItems((prev) => prev.filter((item) => item._id !== productId));
        return;
      }
      setItems((prev) =>
        prev.map((item) =>
          item._id === productId ? { ...item, quantity } : item
        )
      );
    },
    [setItems]
  );

  const clearCart = useCallback(() => setItems([]), [setItems]);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const cartTotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        itemCount,
        clearCart,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
