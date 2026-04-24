"use client";

import { useState, useMemo } from "react";
import { Search, X, ChevronDown, SlidersHorizontal } from "lucide-react";
import type { IProduct } from "@/types";
import { PRODUCT_CATEGORIES, SORT_OPTIONS, type SortOption } from "@/lib/constants";
import { filterProducts } from "@/lib/utils/filterProducts";
import { ProductGrid } from "@/components/product/ProductGrid";
import { formatPrice } from "@/lib/utils/formatPrice";

interface CatalogoClientProps {
  products: IProduct[];
  initialCategory?: string;
}

const CATEGORY_EMOJI: Record<string, string> = {
  "Proteínas": "💪",
  "Creatinas": "⚡",
  "Ganadores de peso": "🏋️",
  "Vitaminas": "💊",
  "Pre-entrenos": "🔥",
  "Quemadores": "🌡️",
  "Snacks": "🥜",
  "Varios": "📦",
};

export function CatalogoClient({ products, initialCategory = "" }: CatalogoClientProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sort, setSort] = useState<SortOption>("newest");
  const [sortOpen, setSortOpen] = useState(false);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [onlyOnSale, setOnlyOnSale] = useState(false);
  const [priceMax, setPriceMax] = useState<number>(() =>
    Math.ceil(Math.max(...products.map((p) => p.price)))
  );
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const maxPrice = useMemo(
    () => Math.ceil(Math.max(...products.map((p) => p.price))),
    [products]
  );
  const minPrice = useMemo(
    () => Math.floor(Math.min(...products.map((p) => p.price))),
    [products]
  );

  const filtered = useMemo(() => {
    let list = filterProducts(products, query, activeCategory, sort);
    if (onlyInStock) list = list.filter((p) => p.inStock);
    if (onlyOnSale) list = list.filter((p) => p.onSale);
    if (priceMax < maxPrice) list = list.filter((p) => (p.onSale && p.salePrice ? p.salePrice : p.price) <= priceMax);
    return list;
  }, [products, query, activeCategory, sort, onlyInStock, onlyOnSale, priceMax, maxPrice]);

  const hasFilters = query.trim() || activeCategory || onlyInStock || onlyOnSale || priceMax < maxPrice;
  const filterCount =
    (activeCategory ? 1 : 0) + (onlyInStock ? 1 : 0) + (onlyOnSale ? 1 : 0) + (priceMax < maxPrice ? 1 : 0);

  function clearFilters() {
    setQuery("");
    setActiveCategory("");
    setSort("newest");
    setOnlyInStock(false);
    setOnlyOnSale(false);
    setPriceMax(maxPrice);
  }

  const sortLabel = SORT_OPTIONS.find((o) => o.value === sort)?.label ?? "Ordenar";

  function SidebarContent() {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-[14px] font-bold" style={{ color: "#0f1f14" }}>Filtros</span>
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="text-[12px]"
              style={{ color: "#86a896", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}
            >
              Limpiar
            </button>
          )}
        </div>

        {/* Categories */}
        <div>
          <p className="text-[11px] font-bold uppercase mb-2.5" style={{ color: "#86a896", letterSpacing: "0.8px" }}>
            Categoría
          </p>
          <div className="flex flex-col gap-1.5">
            {PRODUCT_CATEGORIES.map((cat) => {
              const count = products.filter((p) => p.category === cat).length;
              const active = activeCategory === cat;
              return (
                <label key={cat} className="flex items-center gap-2 cursor-pointer py-1">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={() => setActiveCategory(active ? "" : cat)}
                    style={{ accentColor: "#16a34a", width: 15, height: 15, cursor: "pointer" }}
                  />
                  <span
                    className="flex-1 text-[13px]"
                    style={{ color: active ? "#14532d" : "#3d5a47", fontWeight: active ? 600 : 400 }}
                  >
                    {CATEGORY_EMOJI[cat]} {cat}
                  </span>
                  <span
                    className="text-[11px] px-1.5 py-0.5 rounded-full"
                    style={{ color: "#aab9b1", background: "#f0fdf4" }}
                  >
                    {count}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Price */}
        <div>
          <p className="text-[11px] font-bold uppercase mb-3" style={{ color: "#86a896", letterSpacing: "0.8px" }}>
            Precio
          </p>
          <div className="flex justify-between mb-2">
            <span className="text-[13px] font-semibold" style={{ color: "#14532d" }}>{formatPrice(minPrice)}</span>
            <span className="text-[13px] font-semibold" style={{ color: "#14532d" }}>{formatPrice(priceMax)}</span>
          </div>
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            step={1}
            value={priceMax}
            onChange={(e) => setPriceMax(parseFloat(e.target.value))}
            className="w-full"
            style={{
              WebkitAppearance: "none",
              appearance: "none",
              height: 4,
              background: "#dcfce7",
              borderRadius: 2,
              outline: "none",
              accentColor: "#16a34a",
            }}
          />
        </div>

        {/* Availability */}
        <div>
          <p className="text-[11px] font-bold uppercase mb-2.5" style={{ color: "#86a896", letterSpacing: "0.8px" }}>
            Disponibilidad
          </p>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={onlyInStock}
              onChange={(e) => setOnlyInStock(e.target.checked)}
              style={{ accentColor: "#16a34a", width: 15, height: 15, cursor: "pointer" }}
            />
            <span className="text-[13px]" style={{ color: "#3d5a47" }}>Solo en stock</span>
          </label>
        </div>

        {/* Offers */}
        <div>
          <p className="text-[11px] font-bold uppercase mb-2.5" style={{ color: "#86a896", letterSpacing: "0.8px" }}>
            Ofertas
          </p>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={onlyOnSale}
              onChange={(e) => setOnlyOnSale(e.target.checked)}
              style={{ accentColor: "#16a34a", width: 15, height: 15, cursor: "pointer" }}
            />
            <span className="text-[13px]" style={{ color: "#3d5a47" }}>Solo en oferta</span>
          </label>
        </div>

        {/* Trust badges */}
        <div className="space-y-2.5 pt-4" style={{ borderTop: "1px solid #f0fdf4" }}>
          {[
            ["🚚", "Envíos a todo el país"],
            ["🔒", "Pago 100% seguro"],
            ["💬", "Pedidos por WhatsApp"],
          ].map(([icon, text]) => (
            <div key={text} className="flex items-center gap-2">
              <span className="text-[14px]">{icon}</span>
              <span className="text-[12px] leading-snug" style={{ color: "#86a896" }}>{text}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Search + Sort */}
      <div className="flex gap-2.5 mb-5 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#86a896" }} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar productos..."
            className="w-full h-[42px] pl-9 pr-4 text-[14px] outline-none"
            style={{
              border: "1.5px solid #dcfce7",
              borderRadius: 11,
              background: "#f0fdf4",
              color: "#0f1f14",
              fontFamily: "inherit",
            }}
          />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "#86a896" }}>
              <X size={13} />
            </button>
          )}
        </div>

        {/* Mobile filter button */}
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="md:hidden flex items-center gap-1.5 h-[42px] px-4 text-[14px] font-medium"
          style={{
            border: "1.5px solid #dcfce7",
            borderRadius: 11,
            background: "white",
            color: "#3d5a47",
            fontFamily: "inherit",
            cursor: "pointer",
          }}
        >
          <SlidersHorizontal size={15} />
          Filtros{filterCount > 0 ? ` (${filterCount})` : ""}
        </button>

        {/* Sort */}
        <div className="relative">
          <button
            onClick={() => setSortOpen((v) => !v)}
            className="flex items-center gap-1.5 h-[42px] px-3.5 text-[14px] font-medium whitespace-nowrap"
            style={{
              border: "1.5px solid #dcfce7",
              borderRadius: 11,
              background: "white",
              color: "#3d5a47",
              fontFamily: "inherit",
              cursor: "pointer",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 6h18M7 12h10M11 18h2" /></svg>
            {sortLabel}
            <ChevronDown size={12} style={{ transform: sortOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
          </button>
          {sortOpen && (
            <div
              className="absolute right-0 top-12 z-20 overflow-hidden"
              style={{
                background: "white",
                border: "1.5px solid #dcfce7",
                borderRadius: 14,
                boxShadow: "0 8px 32px rgba(20,83,45,0.12)",
                minWidth: 220,
              }}
            >
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => { setSort(opt.value); setSortOpen(false); }}
                  className="block w-full px-4 py-2.5 text-left text-[13px]"
                  style={{
                    background: sort === opt.value ? "#f0fdf4" : "white",
                    color: sort === opt.value ? "#14532d" : "#5a7a6a",
                    fontWeight: sort === opt.value ? 600 : 400,
                    fontFamily: "inherit",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {sort === opt.value && <span className="mr-2" style={{ color: "#22c55e" }}>✓</span>}
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-5">
        <button
          onClick={() => setActiveCategory("")}
          className="px-4 py-1.5 rounded-full text-[13px] font-medium border transition-all"
          style={{
            background: activeCategory === "" ? "#14532d" : "white",
            color: activeCategory === "" ? "white" : "#5a7a6a",
            borderColor: activeCategory === "" ? "#14532d" : "#dcfce7",
          }}
        >
          Todos
        </button>
        {PRODUCT_CATEGORIES.map((cat) => {
          const active = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(active ? "" : cat)}
              className="px-3.5 py-1.5 rounded-full text-[13px] font-medium border transition-all flex items-center gap-1.5"
              style={{
                background: active ? "#14532d" : "white",
                color: active ? "white" : "#5a7a6a",
                borderColor: active ? "#14532d" : "#dcfce7",
              }}
            >
              <span>{CATEGORY_EMOJI[cat]}</span>
              {cat}
            </button>
          );
        })}
      </div>

      {/* Results bar */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-[13px]" style={{ color: "#86a896" }}>
          {filtered.length === products.length
            ? `${products.length} productos`
            : `${filtered.length} de ${products.length} productos`}
        </p>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-[13px]"
            style={{ color: "#86a896", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}
          >
            <X size={12} />
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Main layout: sidebar + grid */}
      <div className="flex gap-7 items-start">
        {/* Desktop sidebar */}
        <aside className="hidden md:block w-[220px] shrink-0" style={{ position: "sticky", top: 84 }}>
          <SidebarContent />
        </aside>

        {/* Product grid */}
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center gap-3">
              <p className="text-5xl">🔍</p>
              <p className="text-xl font-semibold" style={{ color: "#0f1f14" }}>Sin resultados</p>
              <p className="text-[14px]" style={{ color: "#86a896" }}>
                Prueba con otra búsqueda o limpia los filtros.
              </p>
              <button
                onClick={clearFilters}
                className="mt-2 px-5 py-2.5 rounded-xl text-[13px] font-medium"
                style={{
                  border: "1.5px solid #dcfce7",
                  background: "white",
                  color: "#3d5a47",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                Ver todos los productos
              </button>
            </div>
          ) : (
            <ProductGrid products={filtered} />
          )}
        </div>
      </div>

      {/* Mobile filter bottom sheet */}
      {mobileFilterOpen && (
        <>
          <div
            onClick={() => setMobileFilterOpen(false)}
            className="fixed inset-0 z-50"
            style={{ background: "rgba(15,31,20,0.4)", backdropFilter: "blur(4px)" }}
          />
          <div
            className="fixed bottom-0 left-0 right-0 z-50 overflow-y-auto"
            style={{
              background: "white",
              borderRadius: "20px 20px 0 0",
              maxHeight: "80vh",
              padding: "20px 24px 32px",
              animation: "slideInUp 0.28s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[17px] font-bold" style={{ color: "#0f1f14" }}>Filtros</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg"
                style={{ border: "1.5px solid #dcfce7", background: "white", color: "#5a7a6a", cursor: "pointer" }}
              >
                <X size={14} />
              </button>
            </div>
            <SidebarContent />
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full mt-5 py-3.5 rounded-xl text-[15px] font-semibold text-white"
              style={{ background: "#14532d", border: "none", cursor: "pointer", fontFamily: "inherit" }}
            >
              Ver {filtered.length} productos
            </button>
          </div>
        </>
      )}
    </div>
  );
}
