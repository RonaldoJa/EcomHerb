"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import type { IProduct } from "@/types";
import { PRODUCT_CATEGORIES, SORT_OPTIONS, type SortOption } from "@/lib/constants";
import { filterProducts } from "@/lib/utils/filterProducts";
import { ProductGrid } from "@/components/product/ProductGrid";

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

  const filtered = useMemo(
    () => filterProducts(products, query, activeCategory, sort),
    [products, query, activeCategory, sort]
  );

  const hasActiveFilters = query.trim() || activeCategory;

  function clearFilters() {
    setQuery("");
    setActiveCategory("");
    setSort("newest");
  }

  const sortLabel = SORT_OPTIONS.find((o) => o.value === sort)?.label ?? "Ordenar";

  return (
    <div className="space-y-6">

      {/* Search + Sort row */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9f9b93] pointer-events-none"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar productos..."
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#dad4c8] bg-white text-[15px] text-black placeholder:text-[#9f9b93] focus:outline-none focus:border-black transition-colors"
            style={{ boxShadow: "rgba(0,0,0,0.06) 0px 1px 2px" }}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9f9b93] hover:text-black transition-colors"
              aria-label="Limpiar búsqueda"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Sort dropdown */}
        <div className="relative">
          <button
            onClick={() => setSortOpen((v) => !v)}
            className="flex items-center gap-2 h-11 px-4 rounded-xl border border-[#dad4c8] bg-white text-[15px] font-medium text-[#55534e] hover:border-black transition-colors whitespace-nowrap"
            style={{ boxShadow: "rgba(0,0,0,0.06) 0px 1px 2px" }}
          >
            <SlidersHorizontal size={15} />
            {sortLabel}
            <ChevronDown size={14} className={`transition-transform ${sortOpen ? "rotate-180" : ""}`} />
          </button>
          {sortOpen && (
            <div
              className="absolute right-0 top-12 z-20 bg-white border border-[#dad4c8] rounded-2xl py-2 min-w-[210px] overflow-hidden"
              style={{ boxShadow: "rgba(0,0,0,0.12) 0px 8px 24px" }}
            >
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => { setSort(opt.value); setSortOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-[#faf9f7] ${
                    sort === opt.value
                      ? "text-black font-semibold"
                      : "text-[#55534e]"
                  }`}
                >
                  {sort === opt.value && <span className="mr-2">✓</span>}
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory("")}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
            activeCategory === ""
              ? "bg-black text-white border-black"
              : "bg-white text-[#55534e] border-[#dad4c8] hover:border-black"
          }`}
        >
          Todos
        </button>
        {PRODUCT_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(activeCategory === cat ? "" : cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all flex items-center gap-1.5 ${
              activeCategory === cat
                ? "bg-black text-white border-black"
                : "bg-white text-[#55534e] border-[#dad4c8] hover:border-black"
            }`}
          >
            <span>{CATEGORY_EMOJI[cat]}</span>
            {cat}
          </button>
        ))}
      </div>

      {/* Results bar */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#9f9b93]">
          {filtered.length === products.length
            ? `${products.length} productos`
            : `${filtered.length} de ${products.length} productos`}
        </p>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1.5 text-sm text-[#55534e] hover:text-black transition-colors"
          >
            <X size={13} />
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Active filter badge */}
      {activeCategory && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#9f9b93] uppercase tracking-[1.08px] font-semibold">Filtrando por:</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#faf9f7] border border-[#dad4c8] text-sm font-medium text-black">
            {CATEGORY_EMOJI[activeCategory]} {activeCategory}
            <button onClick={() => setActiveCategory("")} aria-label="Quitar filtro">
              <X size={12} className="text-[#9f9b93] hover:text-black" />
            </button>
          </span>
        </div>
      )}

      {/* Product grid */}
      {filtered.length === 0 && (query || activeCategory) ? (
        <div className="flex flex-col items-center justify-center py-24 text-center gap-3">
          <p className="text-5xl">🔍</p>
          <p className="text-xl font-semibold text-black">Sin resultados</p>
          <p className="text-[#9f9b93] text-sm">
            No encontramos productos para{" "}
            {query ? `"${query}"` : activeCategory}.
          </p>
          <button
            onClick={clearFilters}
            className="mt-2 text-sm underline text-[#55534e] hover:text-black transition-colors"
          >
            Ver todos los productos
          </button>
        </div>
      ) : (
        <ProductGrid products={filtered} />
      )}
    </div>
  );
}
