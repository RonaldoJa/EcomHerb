"use client";

import { X } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useWhatsAppCheckout } from "@/hooks/useWhatsAppCheckout";
import { CartItem } from "./CartItem";
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
        className="fixed inset-0 z-40"
        style={{ background: "rgba(15,31,20,0.35)", backdropFilter: "blur(4px)" }}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-label="Carrito de compras"
        className="fixed right-0 top-0 z-50 h-full flex flex-col"
        style={{
          width: "min(420px,100vw)",
          background: "white",
          boxShadow: "-4px 0 32px rgba(20,83,45,0.16)",
          animation: "slideInRight 0.28s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Header */}
        <div
          className="px-6 py-5 flex items-center justify-between"
          style={{ borderBottom: "1px solid #f0fdf4" }}
        >
          <div>
            <h2 className="text-[18px] font-bold" style={{ color: "#0f1f14", letterSpacing: "-0.3px" }}>
              Tu Carrito
            </h2>
            <p className="text-[12px] mt-0.5" style={{ color: "#86a896" }}>
              {items.length} {items.length === 1 ? "producto" : "productos"}
            </p>
          </div>
          <button
            onClick={closeCart}
            aria-label="Cerrar carrito"
            className="w-9 h-9 flex items-center justify-center rounded-xl transition-colors"
            style={{ border: "1.5px solid #dcfce7", background: "white", color: "#5a7a6a", cursor: "pointer" }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
                style={{ background: "#f0fdf4" }}
              >
                🛒
              </div>
              <p className="text-[16px] font-semibold" style={{ color: "#0f1f14" }}>Carrito vacío</p>
              <p className="text-[13px]" style={{ color: "#86a896" }}>Agrega productos para comenzar</p>
              <button
                onClick={closeCart}
                className="mt-2 px-5 py-2.5 rounded-xl text-[13px] font-medium transition-colors"
                style={{
                  border: "1.5px solid #dcfce7",
                  background: "white",
                  color: "#3d5a47",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                Ver catálogo
              </button>
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
          <div className="px-6 py-5" style={{ borderTop: "1px solid #f0fdf4" }}>
            <div className="flex justify-between mb-1.5">
              <span className="text-[13px]" style={{ color: "#86a896" }}>Subtotal</span>
              <span className="text-[13px]" style={{ color: "#5a7a6a" }}>{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex justify-between mb-5">
              <span className="text-[16px] font-bold" style={{ color: "#0f1f14" }}>Total</span>
              <span className="text-[20px] font-bold" style={{ color: "#0f1f14", letterSpacing: "-0.4px" }}>
                {formatPrice(cartTotal)}
              </span>
            </div>
            <button
              onClick={initiateCheckout}
              className="w-full py-3.5 rounded-xl text-[15px] font-bold text-white flex items-center justify-center gap-2 transition-all"
              style={{ background: "#25D366", border: "none", cursor: "pointer", fontFamily: "inherit" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#1ebe5d";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#25D366";
                (e.currentTarget as HTMLElement).style.transform = "none";
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.853L.057 23.927l6.228-1.634A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.817 9.817 0 01-5.006-1.368l-.36-.213-3.7.971.986-3.606-.235-.371A9.818 9.818 0 012.182 12C2.182 6.578 6.578 2.182 12 2.182S21.818 6.578 21.818 12 17.422 21.818 12 21.818z" />
              </svg>
              Pedir por WhatsApp
            </button>
            <button
              onClick={clearCart}
              className="w-full mt-2 py-2 text-[13px] transition-colors"
              style={{ color: "#86a896", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}
            >
              Vaciar carrito
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
