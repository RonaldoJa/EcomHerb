"use client";

import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import type { IProduct } from "@/types";
import { useCart } from "@/hooks/useCart";

interface AddToCartButtonProps {
  product: IProduct;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <button
      onClick={handleClick}
      disabled={!product.inStock}
      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-[15px] font-bold text-white transition-all"
      style={{
        background: added ? "#14532d" : !product.inStock ? "#e5e7eb" : "#16a34a",
        color: !product.inStock ? "#9ca3af" : "white",
        border: "none",
        cursor: product.inStock ? "pointer" : "not-allowed",
        fontFamily: "inherit",
        boxShadow: product.inStock ? "0 4px 16px rgba(34,197,94,0.35)" : "none",
      }}
    >
      {added ? (
        <>
          <Check size={18} />
          ¡Añadido al carrito!
        </>
      ) : (
        <>
          <ShoppingCart size={18} strokeWidth={1.8} />
          {product.inStock ? "Añadir al carrito" : "Producto agotado"}
        </>
      )}
    </button>
  );
}
