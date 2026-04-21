"use client";

import { X, ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useWhatsAppCheckout } from "@/hooks/useWhatsAppCheckout";
import { CartItem } from "./CartItem";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils/formatPrice";

export function CartDrawer() {
  const { items, isOpen, closeCart, cartTotal, clearCart } = useCart();
  const { initiateCheckout } = useWhatsAppCheckout();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-label="Carrito de compras"
        className="drawer-enter fixed right-0 top-0 z-50 h-full w-full max-w-md bg-[#faf9f7] flex flex-col"
        style={{ boxShadow: "-4px 0 24px rgba(0,0,0,0.12)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#dad4c8] bg-white">
          <h2 className="font-semibold text-lg text-black">Tu Carrito</h2>
          <button
            onClick={closeCart}
            aria-label="Cerrar carrito"
            className="p-2 rounded-xl border border-[#dad4c8] hover:border-black transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-2">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-16 h-16 rounded-full bg-[#eee9df] flex items-center justify-center">
                <ShoppingBag size={28} className="text-[#9f9b93]" />
              </div>
              <p className="font-medium text-black">Tu carrito está vacío</p>
              <p className="text-sm text-[#9f9b93]">Agrega productos para comenzar</p>
              <Button variant="ghost" onClick={closeCart}>
                Ver catálogo
              </Button>
            </div>
          ) : (
            <div>
              {items.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-[#dad4c8] bg-white space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#55534e]">Total estimado</span>
              <span className="text-xl font-semibold text-black">{formatPrice(cartTotal)}</span>
            </div>
            <Button
              onClick={initiateCheckout}
              className="w-full bg-[#25D366] text-white border-[#25D366] hover:bg-[#1ebe5d] hover:border-[#1ebe5d] justify-center text-base py-3 rounded-2xl">
              Pedir por WhatsApp
            </Button>
            <button
              onClick={clearCart}
              className="w-full text-sm text-[#9f9b93] hover:text-[#fc7981] transition-colors py-1">
              Vaciar carrito
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
