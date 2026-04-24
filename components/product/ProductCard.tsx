"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import type { IProduct } from "@/types";
import { formatPrice } from "@/lib/utils/formatPrice";
import { getEffectivePrice, getDiscountPercent } from "@/lib/utils/saleUtils";
import { portableTextToPlain } from "@/lib/utils/portableTextToPlain";
import { useCart } from "@/hooks/useCart";

interface ProductCardProps {
  product: IProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const effectivePrice = getEffectivePrice(product);
  const discountPercent = getDiscountPercent(product);
  const plainDescription = portableTextToPlain(product.description);

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    if (!product.inStock) return;
    setAdded(true);
    addToCart(product);
    setTimeout(() => setAdded(false), 1400);
  }

  return (
    <article
      className="product-card flex flex-col bg-white overflow-hidden transition-all duration-200"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 14,
        border: `1.5px solid ${hovered ? "#86efac" : "#f0fdf4"}`,
        boxShadow: hovered
          ? "0 12px 32px rgba(20,83,45,0.12)"
          : "0 1px 4px rgba(20,83,45,0.06)",
      }}
    >
      {/* Image area */}
      <div className="relative h-52 overflow-hidden" style={{ background: "#f0fdf4" }}>
        <Link href={`/producto/${product.slug.current}`} className="block w-full h-full">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ShoppingCart size={32} style={{ color: "#bbf7d0" }} />
            </div>
          )}
        </Link>

        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/75 flex items-center justify-center">
            <span
              className="text-[11px] font-bold uppercase px-3.5 py-1.5 rounded-full"
              style={{ background: "#0f1f14", color: "white", letterSpacing: "0.8px" }}
            >
              Agotado
            </span>
          </div>
        )}

        {/* Badges top-left */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isBestSeller && (
            <span
              className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full flex items-center gap-1"
              style={{ background: "#14532d", color: "white", letterSpacing: "0.6px" }}
            >
              ★ Best Seller
            </span>
          )}
          {product.onSale && (
            <span
              className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full"
              style={{ background: "#16a34a", color: "white", letterSpacing: "0.6px" }}
            >
              −{discountPercent}% Oferta
            </span>
          )}
        </div>

        {/* Hover quick-add overlay */}
        {product.inStock && (
          <div
            className="absolute bottom-0 left-0 right-0 p-3 transition-transform duration-200"
            style={{
              background: "linear-gradient(to top, rgba(15,31,20,0.6), transparent)",
              transform: hovered ? "translateY(0)" : "translateY(100%)",
            }}
          >
            <button
              onClick={handleAdd}
              className="w-full h-9 rounded-xl text-white text-[13px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
              style={{ background: added ? "#14532d" : "#16a34a" }}
            >
              {added ? (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                  Añadido
                </>
              ) : (
                <>
                  <ShoppingCart size={13} />
                  Añadir al carrito
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <span
          className="text-[11px] font-semibold uppercase"
          style={{ color: "#86a896", letterSpacing: "0.8px" }}
        >
          {product.category}
        </span>

        <Link href={`/producto/${product.slug.current}`}>
          <h3
            className="font-semibold text-[15px] leading-snug line-clamp-2 hover:text-[#14532d] transition-colors"
            style={{ color: "#0f1f14", letterSpacing: "-0.2px" }}
          >
            {product.name}
          </h3>
        </Link>

        <p className="text-[12px] leading-relaxed line-clamp-2 flex-1" style={{ color: "#86a896" }}>
          {plainDescription}
        </p>

        {/* Price + button */}
        <div className="flex items-center justify-between gap-3 mt-1">
          <div>
            <span className="text-[18px] font-bold" style={{ color: "#0f1f14", letterSpacing: "-0.4px" }}>
              {formatPrice(effectivePrice)}
            </span>
            {product.onSale && product.salePrice && (
              <span className="text-[12px] line-through ml-1.5" style={{ color: "#aab9b1" }}>
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          <button
            onClick={handleAdd}
            disabled={!product.inStock}
            className="h-[34px] px-3.5 rounded-xl text-[12px] font-semibold flex items-center gap-1.5 transition-colors shrink-0"
            style={{
              background: added ? "#14532d" : !product.inStock ? "#e5e7eb" : "#16a34a",
              color: !product.inStock ? "#9ca3af" : "white",
              cursor: product.inStock ? "pointer" : "not-allowed",
            }}
          >
            {added ? (
              <>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                Añadido
              </>
            ) : (
              <>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                Agregar
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
