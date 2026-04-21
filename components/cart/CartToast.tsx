"use client";

import { CheckCircle } from "lucide-react";
import { useCart } from "@/hooks/useCart";

export function CartToast() {
  const { toasts } = useCart();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed top-20 right-4 z-[60] flex flex-col gap-2 pointer-events-none"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="flex items-center gap-3 bg-white border border-[#dad4c8] rounded-2xl px-4 py-3 shadow-lg animate-in slide-in-from-right-4 fade-in duration-300"
          style={{
            boxShadow: "rgba(0,0,0,0.12) 0px 8px 24px, rgba(0,0,0,0.04) 0px -1px 1px inset",
            animation: "slideInToast 0.3s ease-out",
          }}
        >
          <span className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-[#02492a]">
            <CheckCircle size={16} className="text-[#84e7a5]" strokeWidth={2.5} />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-black leading-tight truncate max-w-[200px]">
              {toast.productName}
            </p>
            <p className="text-xs text-[#9f9b93]">Agregado al carrito</p>
          </div>
        </div>
      ))}
    </div>
  );
}
