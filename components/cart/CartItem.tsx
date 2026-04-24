"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { ICartItem } from "@/types";
import { formatPrice } from "@/lib/utils/formatPrice";
import { getBulkUnitPrice, getItemTotal, hasBulkDiscount, getMaxQuantity } from "@/lib/utils/saleUtils";
import { useCart } from "@/hooks/useCart";

interface CartItemProps {
  item: ICartItem;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const maxQty = getMaxQuantity(item);
  const bulkActive = hasBulkDiscount(item, item.quantity);
  const unitPrice = getBulkUnitPrice(item, item.quantity);
  const lineTotal = getItemTotal(item, item.quantity);

  return (
    <div className="flex gap-3 py-4 border-b last:border-none" style={{ borderColor: "#f0fdf4" }}>
      {/* Thumbnail */}
      <div className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden" style={{ border: "1.5px solid #dcfce7", background: "#f0fdf4" }}>
        {item.imageUrl ? (
          <Image src={item.imageUrl} alt={item.name} fill className="object-cover" sizes="64px" />
        ) : (
          <div className="w-full h-full bg-[#eee9df]" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-black leading-tight truncate">{item.name}</p>

        {/* Price info */}
        <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
          <p className="text-xs text-[#9f9b93]">{formatPrice(unitPrice)} c/u</p>
          {bulkActive && (
            <span className="text-[10px] font-bold text-[#078a52] bg-[#f0fdf4] border border-[#84e7a5] px-1.5 py-0.5 rounded-full">
              −{item.bulkDiscountPercent}% volumen
            </span>
          )}
        </div>

        {/* Bulk discount prompt */}
        {!bulkActive && item.bulkDiscountMinQty && item.bulkDiscountPercent && (
          <p className="text-[10px] text-[#9f9b93] mt-0.5">
            Agrega {item.bulkDiscountMinQty - item.quantity} más → −{item.bulkDiscountPercent}% off
          </p>
        )}

        {/* Quantity controls */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => updateQuantity(item._id, item.quantity - 1)}
            aria-label="Reducir cantidad"
            className="w-7 h-7 flex items-center justify-center rounded-lg transition-colors disabled:opacity-40" style={{ border: "1.5px solid #dcfce7" }}
          >
            <Minus size={12} />
          </button>
          <span className="text-sm font-medium w-5 text-center">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item._id, item.quantity + 1)}
            aria-label="Aumentar cantidad"
            disabled={item.quantity >= maxQty}
            className="w-7 h-7 flex items-center justify-center rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed" style={{ border: "1.5px solid #dcfce7" }}
          >
            <Plus size={12} />
          </button>
          {item.quantity >= maxQty && (
            <span className="text-[10px] text-[#9f9b93]">Máx.</span>
          )}
        </div>
      </div>

      {/* Subtotal + delete */}
      <div className="flex flex-col items-end justify-between shrink-0">
        <div className="text-right">
          <p className="text-sm font-semibold text-black">{formatPrice(lineTotal)}</p>
          {bulkActive && (
            <p className="text-[10px] text-[#9f9b93] line-through">
              {formatPrice(item.price * item.quantity)}
            </p>
          )}
        </div>
        <button
          onClick={() => removeFromCart(item._id)}
          aria-label="Eliminar producto"
          className="p-1.5 rounded-lg transition-colors" style={{ color: "#aab9b1" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#ef4444"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#aab9b1"; }}
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}
