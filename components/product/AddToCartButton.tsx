"use client";

import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import type { IProduct } from "@/types";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/Button";

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
    <Button
      variant={added ? "ghost" : "primary"}
      onClick={handleClick}
      disabled={!product.inStock}
      className="w-full justify-center py-3 text-base rounded-2xl gap-2"
    >
      {added ? (
        <>
          <Check size={18} />
          Agregado al carrito
        </>
      ) : (
        <>
          <ShoppingCart size={18} />
          {product.inStock ? "Agregar al carrito" : "Producto agotado"}
        </>
      )}
    </Button>
  );
}
