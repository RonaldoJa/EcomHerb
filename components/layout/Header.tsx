"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { STORE_NAME } from "@/lib/constants";

export function Header() {
  const { itemCount, openCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#faf9f7] border-b border-[#dad4c8]"
      style={{ boxShadow: "rgba(0,0,0,0.06) 0px 1px 4px" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-black text-white text-sm font-bold">
            {STORE_NAME.charAt(0)}
          </span>
          <span className="font-semibold text-lg tracking-tight text-black">
            {STORE_NAME}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/"
            className="text-[15px] font-medium text-[#55534e] hover:text-black transition-colors">
            Inicio
          </Link>
          <Link href="/catalogo"
            className="text-[15px] font-medium text-[#55534e] hover:text-black transition-colors">
            Catálogo
          </Link>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={openCart}
            aria-label="Abrir carrito"
            className="relative p-2 rounded-xl border border-[#dad4c8] bg-white hover:border-black transition-colors clay-btn-hover"
            style={{ boxShadow: "rgba(0,0,0,0.1) 0px 1px 1px, rgba(0,0,0,0.04) 0px -1px 1px inset" }}>
            <ShoppingCart size={20} strokeWidth={1.8} />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 flex items-center justify-center rounded-full bg-black text-white text-[10px] font-bold leading-none">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 rounded-xl border border-[#dad4c8] bg-white"
            aria-label="Menú">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-[#dad4c8] bg-[#faf9f7] px-4 py-4 flex flex-col gap-4">
          <Link href="/" onClick={() => setMobileOpen(false)}
            className="text-base font-medium text-[#55534e] hover:text-black">
            Inicio
          </Link>
          <Link href="/catalogo" onClick={() => setMobileOpen(false)}
            className="text-base font-medium text-[#55534e] hover:text-black">
            Catálogo
          </Link>
        </nav>
      )}
    </header>
  );
}
