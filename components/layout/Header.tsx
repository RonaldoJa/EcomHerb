"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X, Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useCart } from "@/hooks/useCart";
import { STORE_NAME } from "@/lib/constants";

export function Header() {
  const { itemCount, openCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [prevCount, setPrevCount] = useState(itemCount);
  const [badgeAnim, setBadgeAnim] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (itemCount !== prevCount) {
      setBadgeAnim(true);
      setPrevCount(itemCount);
      setTimeout(() => setBadgeAnim(false), 300);
    }
  }, [itemCount, prevCount]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchQuery("");
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #dcfce7",
        boxShadow: "0 1px 8px rgba(20,83,45,0.06)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div
            className="w-8 h-8 rounded-[10px] flex items-center justify-center text-base"
            style={{
              background: "linear-gradient(135deg, #14532d, #16a34a)",
              boxShadow: "0 2px 8px rgba(22,163,74,0.35)",
            }}
          >
            🌿
          </div>
          <span className="font-bold text-[17px] text-[#0f1f14]" style={{ letterSpacing: "-0.3px" }}>
            {STORE_NAME}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 ml-3">
          {[
            { href: "/", label: "Inicio" },
            { href: "/catalogo", label: "Catálogo" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="px-3 py-1.5 text-sm font-medium text-[#5a7a6a] hover:text-[#14532d] rounded-lg hover:bg-[#f0fdf4] transition-all"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Search bar (desktop) */}
        <div ref={searchRef} className="hidden md:flex flex-1 max-w-md relative">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#86a896] pointer-events-none"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar proteínas, vitaminas..."
            className="w-full h-10 pl-9 pr-4 rounded-xl text-sm text-[#0f1f14] placeholder:text-[#86a896] outline-none transition-all"
            style={{
              border: "1.5px solid #dcfce7",
              background: "#f0fdf4",
              fontFamily: "inherit",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#22c55e")}
            onBlur={(e) => (e.target.style.borderColor = "#dcfce7")}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#86a896] hover:text-[#0f1f14]"
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Cart */}
          <button
            onClick={openCart}
            aria-label="Abrir carrito"
            className="relative w-10 h-10 rounded-xl flex items-center justify-center transition-all"
            style={{
              border: "1.5px solid #dcfce7",
              background: "white",
              color: "#14532d",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#22c55e";
              (e.currentTarget as HTMLElement).style.background = "#f0fdf4";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#dcfce7";
              (e.currentTarget as HTMLElement).style.background = "white";
            }}
          >
            <ShoppingCart size={18} strokeWidth={1.8} />
            {itemCount > 0 && (
              <span
                className={`absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full text-white text-[10px] font-bold border-2 border-white ${badgeAnim ? "scale-125" : "scale-100"} transition-transform`}
                style={{ background: "#16a34a" }}
              >
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ border: "1.5px solid #dcfce7", background: "white", color: "#14532d" }}
            aria-label="Menú"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div style={{ borderTop: "1px solid #dcfce7", background: "white" }} className="md:hidden px-4 py-4 flex flex-col gap-2">
          {/* Mobile search */}
          <div className="relative mb-2">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#86a896] pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar productos..."
              className="w-full h-10 pl-9 pr-4 rounded-xl text-sm outline-none"
              style={{ border: "1.5px solid #dcfce7", background: "#f0fdf4", fontFamily: "inherit" }}
            />
          </div>
          {[
            { href: "/", label: "Inicio" },
            { href: "/catalogo", label: "Catálogo" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="px-2 py-2.5 text-[15px] font-medium text-[#5a7a6a] hover:text-[#14532d] rounded-lg hover:bg-[#f0fdf4] transition-all"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
