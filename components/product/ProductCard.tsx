"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import type { IProduct } from "@/types";
import { formatPrice } from "@/lib/utils/formatPrice";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/Button";

interface ProductCardProps {
  product: IProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <article
      className="group bg-white border border-[#dad4c8] rounded-3xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1"
      style={{ boxShadow: "rgba(0,0,0,0.1) 0px 1px 1px, rgba(0,0,0,0.04) 0px -1px 1px inset" }}
    >
      {/* Image */}
      <Link href={`/producto/${product.slug.current}`} className="block relative h-56 bg-[#faf9f7] overflow-hidden">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-[#eee9df] flex items-center justify-center">
            <ShoppingCart size={32} className="text-[#dad4c8]" />
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="bg-black text-white text-xs font-semibold uppercase tracking-[1.08px] px-3 py-1 rounded-full">
              Agotado
            </span>
          </div>
        )}
        {product.category && (
          <span className="absolute top-3 left-3 bg-[#faf9f7] border border-[#dad4c8] text-[#55534e] text-[10px] font-semibold uppercase tracking-[1.08px] px-2.5 py-1 rounded-full">
            {product.category}
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <Link href={`/producto/${product.slug.current}`}>
          <h3 className="font-semibold text-[17px] text-black leading-tight hover:underline line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-[#9f9b93] leading-relaxed line-clamp-2 flex-1">
          {product.description}
        </p>
        <div className="flex items-center justify-between gap-3 pt-1">
          <p className="text-lg font-semibold text-black">{formatPrice(product.price)}</p>
          <Button
            variant="primary"
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
            className="text-sm px-4 py-2 rounded-xl"
          >
            <ShoppingCart size={15} />
            Agregar
          </Button>
        </div>
      </div>
    </article>
  );
}
