"use client";

import { createContext, useState, useCallback, ReactNode } from "react";
import type { ICartContext, ICartItem, IProduct, IToast } from "@/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { getItemTotal, getMaxQuantity } from "@/lib/utils/saleUtils";
import { CART_STORAGE_KEY } from "@/lib/constants";

export const CartContext = createContext<ICartContext | null>(null);

const TOAST_DURATION_MS = 2800;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useLocalStorage<ICartItem[]>(CART_STORAGE_KEY, []);
  const [isOpen, setIsOpen] = useState(false);
  const [toasts, setToasts] = useState<IToast[]>([]);

  function pushToast(productName: string) {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, productName }]);
    setTimeout(
      () => setToasts((prev) => prev.filter((t) => t.id !== id)),
      TOAST_DURATION_MS
    );
  }

  const addToCart = useCallback(
    (product: IProduct) => {
      const maxQty = getMaxQuantity(product);
      setItems((prev) => {
        const existing = prev.find((item) => item._id === product._id);
        if (existing) {
          if (existing.quantity >= maxQty) return prev;
          return prev.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prev, { ...product, quantity: 1 }];
      });
      pushToast(product.name);
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
        prev.map((item) => {
          if (item._id !== productId) return item;
          const maxQty = getMaxQuantity(item);
          return { ...item, quantity: Math.min(quantity, maxQty) };
        })
      );
    },
    [setItems]
  );

  const clearCart = useCallback(() => setItems([]), [setItems]);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const cartTotal = items.reduce(
    (sum, item) => sum + getItemTotal(item, item.quantity),
    0
  );

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        toasts,
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
