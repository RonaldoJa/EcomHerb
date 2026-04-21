"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { ICartItem } from "@/types";
import { formatPrice } from "@/lib/utils/formatPrice";
import { useCart } from "@/hooks/useCart";

interface CartItemProps {
  item: ICartItem;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex gap-3 py-4 border-b border-[#eee9df] last:border-none">
      {/* Thumbnail */}
      <div className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden border border-[#dad4c8] bg-[#faf9f7]">
        {item.imageUrl ? (
          <Image src={item.imageUrl} alt={item.name} fill className="object-cover" sizes="64px" />
        ) : (
          <div className="w-full h-full bg-[#eee9df]" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-black leading-tight truncate">{item.name}</p>
        <p className="text-xs text-[#9f9b93] mt-0.5">{formatPrice(item.price)} c/u</p>

        {/* Quantity controls */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => updateQuantity(item._id, item.quantity - 1)}
            aria-label="Reducir cantidad"
            className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#dad4c8] hover:border-black transition-colors">
            <Minus size={12} />
          </button>
          <span className="text-sm font-medium w-5 text-center">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item._id, item.quantity + 1)}
            aria-label="Aumentar cantidad"
            className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#dad4c8] hover:border-black transition-colors">
            <Plus size={12} />
          </button>
        </div>
      </div>

      {/* Subtotal + delete */}
      <div className="flex flex-col items-end justify-between shrink-0">
        <p className="text-sm font-semibold text-black">
          {formatPrice(item.price * item.quantity)}
        </p>
        <button
          onClick={() => removeFromCart(item._id)}
          aria-label="Eliminar producto"
          className="p-1.5 rounded-lg text-[#9f9b93] hover:text-[#fc7981] hover:bg-[#fff5f5] transition-colors">
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}
